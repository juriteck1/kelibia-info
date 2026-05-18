import { createClient } from '@supabase/supabase-js'
import type { Plan, Review, Event, ImmoListing } from '@/types'

// Server-side client (works in both server and client components)
export function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Map Supabase row → Plan type (DB uses 'description', 'map_url'; type uses 'desc', 'map')
function mapPlan(row: Record<string, unknown>): Plan {
  return {
    id: row.id as number,
    title: row.title as string,
    cat: row.cat as string,
    desc: (row.description ?? row.desc ?? '') as string,
    addr: (row.addr ?? '') as string,
    phone: row.phone as string | undefined,
    rating: (row.rating ?? 0) as number,
    rc: (row.rc ?? 0) as number,
    tags: (row.tags ?? []) as string[],
    featured: (row.featured ?? false
