/**
 * Supabase browser client — publishable key only.
 * Configure RLS on `public.leads` to allow INSERT for anon; deny SELECT/UPDATE/DELETE.
 */
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.1';

export const SUPABASE_URL = 'https://qqgftpvfljqmgmmyelsp.supabase.co';

/** Publishable (anon) key — safe to ship in frontend. Never use service_role here. */
export const SUPABASE_PUBLISHABLE_KEY =
  'sb_publishable_pxCyr2tH8bX7YbtJ9SLAGg_85CFqNm1';

let client;

/**
 * @returns {import('@supabase/supabase-js').SupabaseClient}
 */
export function getSupabase() {
  if (!client) {
    client = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      },
    });
  }
  return client;
}
