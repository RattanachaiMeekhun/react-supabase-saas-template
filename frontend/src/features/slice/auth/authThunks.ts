import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utils/axios";
import type {
  LoginPayload,
  LoginResponse,
  SignUpPayload,
  SignUpResponse,
  CheckAuthResponse,
} from "./authTypes";

// Async thunk to check authentication status
export const checkAuthStatus = createAsyncThunk<CheckAuthResponse, void>(
  "auth/checkAuthStatus",
  async (_, { rejectWithValue }) => {
    try {
      if (localStorage.getItem("access_token") === null) {
        return rejectWithValue("No access token found");
      }
      const response = await axiosInstance.get("/auth/check");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to check authentication status");
    }
  }
);

// Async thunk to log in a user
export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance
        .post("/auth/login", credentials)
        .catch((error) => error.response);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

// Async thunk to log out a user
export const logoutUser = createAsyncThunk<void, void>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const response = await axiosInstance.post("/auth/logout", {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  }
);

// Async thunk to sign up a user
export const signUpUser = createAsyncThunk<SignUpResponse, SignUpPayload>(
  "auth/signUpUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance
        .post("/auth/signup", credentials)
        .catch((error) => error.response);
      if (response.data.error) {
        return rejectWithValue(response.data.error);
      }
      return response.data;
    } catch (error) {
      return rejectWithValue("Sign up failed");
    }
  }
);
