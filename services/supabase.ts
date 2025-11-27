import { createClient } from '@supabase/supabase-js';

// Fallback to placeholder values if environment variables are not set
// This prevents the app from crashing on startup in environments without a .env file.
// Real functionality will require valid credentials.
const supabaseUrl = process.env.VITE_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || "placeholder-anon-key";

if (supabaseUrl === "https://placeholder.supabase.co") {
  console.warn("Supabase is not configured. Please provide VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment for the app to work.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
