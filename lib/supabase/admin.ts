import { createClient } from '@supabase/supabase-js'

// IMPORTANT: This client is for server-side use ONLY and bypasses RLS.
// Do not expose this client or the service role key to the browser.

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
