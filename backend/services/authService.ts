import { pool } from "../postgreSQL/postgrePool";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN || "7d";
const SALT_ROUNDS = 10;

interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: string;
  updated_at: string;
}

export const authService = {
  async signup(email: string, password: string) {
    try {
      // Check if user already exists
      const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        return {
          data: null,
          error: { message: "User already exists with this email" },
        };
      }

      // Hash password
      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

      // Insert new user
      const result = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at, updated_at",
        [email, passwordHash]
      );

      const user = result.rows[0];

      return {
        data: {
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
        },
        error: null,
      };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async login(email: string, password: string) {
    try {
      // Get user from database
      const result = await pool.query(
        "SELECT id, email, password_hash, created_at, updated_at FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return { data: null, error: { message: "Invalid credentials" } };
      }

      const user: User = result.rows[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!isValidPassword) {
        return { data: null, error: { message: "Invalid credentials" } };
      }

      // Generate tokens
      const accessToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
      );

      const refreshToken = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: REFRESH_TOKEN_EXPIRES_IN } as jwt.SignOptions
      );

      // Store refresh token in database
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

      await pool.query(
        "INSERT INTO sessions (user_id, refresh_token, expires_at) VALUES ($1, $2, $3)",
        [user.id, refreshToken, expiresAt]
      );

      return {
        data: {
          access_token: accessToken,
          refresh_token: refreshToken,
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
        },
        error: null,
      };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async logout(refreshToken: string) {
    try {
      // Delete session from database
      await pool.query("DELETE FROM sessions WHERE refresh_token = $1", [
        refreshToken,
      ]);

      return { data: { message: "Logged out successfully" }, error: null };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        userId: string;
        email: string;
      };

      // Get user from database
      const result = await pool.query(
        "SELECT id, email, created_at, updated_at FROM users WHERE id = $1",
        [decoded.userId]
      );

      if (result.rows.length === 0) {
        return { data: null, error: { message: "User not found" } };
      }

      const user = result.rows[0];

      return {
        data: {
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
          },
        },
        error: null,
      };
    } catch (err: any) {
      if (err.name === "JsonWebTokenError") {
        return { data: null, error: { message: "Invalid token" } };
      }
      if (err.name === "TokenExpiredError") {
        return { data: null, error: { message: "Token expired" } };
      }
      return { data: null, error: { message: err.message } };
    }
  },

  async refreshAccessToken(refreshToken: string) {
    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken, JWT_SECRET) as {
        userId: string;
        email: string;
      };

      // Check if refresh token exists in database
      const sessionResult = await pool.query(
        "SELECT user_id, expires_at FROM sessions WHERE refresh_token = $1",
        [refreshToken]
      );

      if (sessionResult.rows.length === 0) {
        return { data: null, error: { message: "Invalid refresh token" } };
      }

      const session = sessionResult.rows[0];

      // Check if token is expired
      if (new Date(session.expires_at) < new Date()) {
        await pool.query("DELETE FROM sessions WHERE refresh_token = $1", [
          refreshToken,
        ]);
        return { data: null, error: { message: "Refresh token expired" } };
      }

      // Generate new access token
      const accessToken = jwt.sign(
        { userId: decoded.userId, email: decoded.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
      );

      return {
        data: { access_token: accessToken },
        error: null,
      };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
