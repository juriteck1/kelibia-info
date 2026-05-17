import { createClient } from '@supabase/supabase-js'
import type { Plan, Review, Event } from '@/types'

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
    featured: (row.featured ?? false) as boolean,
    img: (row.img ?? '') as string,
    map: (row.map_url ?? row.map) as string | undefined,
    created_at: row.created_at as string | undefined,
  }
}

// Map Supabase row → Event type (DB uses 'event_date', 'event_time', 'description')
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
  const { data, error } = await sb
    .from('plans')
    .select('*')
    .eq('status', 'published')
    .order('id')
  if (error || !data) return []
  return data.map(mapPlan)
}

export async function getPlan(id: number): Promise<Plan | null> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('plans')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return mapPlan(data)
}

export async function getReviews(planId: number): Promise<Review[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('reviews')
    .select('*')
    .eq('plan_id', planId)
    .order('created_at', { ascending: false })
  if (error || !data) return []
  return data as Review[]
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>): Promise<void> {
  const sb = getSupabase()
  await sb.from('reviews').insert(review)
}

export async function getEvents(): Promise<Event[]> {
  const sb = getSupabase()
  const { data, error } = await sb
    .from('events')
    .select('*')
    .eq('status', 'published')
    .order('event_date')
  if (error || !data) return []
  return data.map(mapEvent)
}
export async function getImmoListings(type?: string): Promise<ImmoListing[]> {
  const sb = getSupabase()
  let query = sb
    .from('immo_listings')
    .select('*')
    .eq('status', 'published')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (type && type !== 'all') query = query.eq('type', type)

  const { data, error } = await query
  if (error || !data) return []
  return data.map(row => ({
    id: row.id as number,
    title: row.title as string,
    type: row.type as 'vente' | 'location' | 'vacances',
    price: row.price as number,
    surface: row.surface as number,
    rooms: row.rooms as number,
    beds: row.beds as number,
    addr: row.addr as string,
    desc: (row.description ?? '') as string,
    img: (row.img ?? '') as string,
    agent_name: row.agent_name as string | undefined,
    agent_phone: row.agent_phone as string | undefined,
    featured: (row.featured ?? false) as boolean,
    created_at: row.created_at as string | undefined,
  }))
}
