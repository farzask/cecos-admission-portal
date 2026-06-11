import { createBrowserClient } from '@supabase/ssr';

/**
 * Browser Supabase client for client components.
 * Returns `null` when env vars are missing so callers can fall back to
 * static data.
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
