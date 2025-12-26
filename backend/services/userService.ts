import { supabase } from "../supabase/supabaseClient";
import { pool } from "../postgreSQL/postgrePool";

const DB_PROVIDER = process.env.DB_PROVIDER || "supabase"; // 'supabase' or 'postgres'

export const userService = {
  async getAllUser() {
    if (DB_PROVIDER === "postgres") {
      // Direct PostgreSQL connection
      try {
        const result = await pool.query("SELECT * FROM users");
        return { data: result.rows, error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message } };
      }
    } else {
      // Supabase Client (REST API)
      const { data, error } = await supabase.from("users").select("*");
      return { data, error };
    }
  },

  async getUserById(id: string) {
    if (DB_PROVIDER === "postgres") {
      try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [
          id,
        ]);
        return { data: result.rows[0], error: null };
      } catch (err: any) {
        return { data: null, error: { message: err.message } };
      }
    } else {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .single();
      return { data, error };
    }
  },
};
