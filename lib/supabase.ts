import { createBrowserClient } from '@supabase/ssr'

let _authClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (!_authClient) {
    _authClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _authClient
}
