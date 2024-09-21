import { createClient } from '@supabase/supabase-js'
const supabaseUrl = import.meta.env.VITE_SB_API_URL;
const supabaseAnonKey = import.meta.env.VITE_SB_ANON_KEY;
console.log(supabaseUrl, supabaseAnonKey);

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
