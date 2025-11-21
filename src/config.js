// Supabase configuration (from environment variables)
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Event state polling interval (milliseconds)
export const POLL_INTERVAL = parseInt(import.meta.env.VITE_POLL_INTERVAL) || 15000;
