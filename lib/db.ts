import { createClient } from '@supabase/supabase-js'
import type { Plan, Review, Event, ImmoListing } from '@/types'

// ── Singleton Supabase — une seule instance pour tout le site ──
let _supabase: ReturnType<typeof createClient> | null = null
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return _supabase
}

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
    featured: (row.featured ?? false) as boolean,
    img: (row.img ?? '') as string,
    map: (row.map_url ?? row.map) as string | undefined,
    created_at: row.created_at as string | undefined,
  }
}
function mapEvent(row: Record<string, unknown>): Event {
  return {
    id: row.id as number,
    title: row.title as string,
    desc: (row.description ?? row.desc ?? '') as string,
    date: (row.event_date ?? row.date ?? '') as string,
    time: (row.event_time ?? row.time ?? '') as string,
    loc: (row.loc ?? '') as string,
    cat: (row.cat ?? '') as string,
    img: (row.img ?? '') as string,
    attendees: (row.attendees ?? 0) as number,
    featured: (row.featured ?? false) as boolean,
    created_at: row.created_at as string | undefined,
  }
}
export async function getPlans(): Promise<Plan[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('plans').select('*').eq('status', 'published').order('id')
  if (error || !data) return []
  return data.map(mapPlan)
}
export async function getPlan(id: number): Promise<Plan | null> {
  const sb = getSupabase()
  const { data, error } = await sb.from('plans').select('*').eq('id', id).single()
  if (error || !data) return null
  return mapPlan(data)
}
export async function getReviews(planId: number): Promise<Review[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('reviews').select('*').eq('plan_id', planId).order('created_at', { ascending: false })
  if (error || !data) return []
  return data as Review[]
}
export async function addReview(review: Omit<Review, 'id' | 'created_at'>): Promise
