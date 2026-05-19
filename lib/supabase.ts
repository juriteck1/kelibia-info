import { createClient } from '@supabase/supabase-js'

// Un seul client partagé par toute l'application
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
