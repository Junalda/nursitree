import { createClient } from '@supabase/supabase-js';

// Initialize database client.
// Credentials are read from environment variables so they are never hardcoded
// in source. Copy `.env.example` to `.env` and fill in your project values.
// Note: the Supabase "anon" key is a public, browser-safe key protected by
// Row Level Security — it is intended to be shipped to the client. It is kept
// in env vars to avoid committing it to the repository.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseKey) {
  // Surface a clear message during development without crashing the whole app.
  console.warn(
    '[supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. ' +
      'Copy .env.example to .env and set your values. ' +
      'The contact form will not be able to submit until these are configured.'
  );
}

const supabase = createClient(supabaseUrl ?? '', supabaseKey ?? '');

export { supabase };
