import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Credentials are read from environment variables so they are never hardcoded
// in source. Copy `.env.example` to `.env` (locally) or set them in your host's
// environment-variable settings (e.g. Vercel) and fill in your project values.
//
// Note: the Supabase "anon" key is a public, browser-safe key protected by
// Row Level Security — it is intended to be shipped to the client. It is kept
// in env vars to avoid committing it to the repository.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** True only when both Supabase env vars are present. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

let client: SupabaseClient | null = null;

/**
 * Lazily creates and returns the Supabase client.
 *
 * IMPORTANT: the client is created on first use rather than at module load.
 * Creating it at the top level with empty credentials makes supabase-js throw
 * ("supabaseUrl is required."), which would crash the whole app at bootstrap
 * and render a blank page. Returning `null` when unconfigured keeps the site
 * fully functional and lets the contact form degrade gracefully.
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    console.warn(
      '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
        'Set them in your .env (local) or host environment variables (e.g. Vercel). ' +
        'The contact form will not be able to submit until these are configured.'
    );
    return null;
  }
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseKey as string);
  }
  return client;
}
