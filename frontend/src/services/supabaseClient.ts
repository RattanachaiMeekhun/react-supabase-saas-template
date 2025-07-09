import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ตรวจสอบว่ามี environment variables ที่จำเป็นหรือไม่
if (!supabaseUrl) {
  throw new Error(
    "Missing environment variable: VITE_SUPABASE_URL. " +
    "Please add your Supabase project URL to your .env file."
  );
}

if (!supabaseAnonKey) {
  throw new Error(
    "Missing environment variable: VITE_SUPABASE_ANON_KEY. " +
    "Please add your Supabase anon key to your .env file."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
