import { createClient } from '@supabase/supabase-js'
import { createClient as createAuthClient } from './supabase'
import type { Plan, Review, Event, ImmoListing } from '@/types'

let _db: ReturnType<typeof createClient> | null = null

// Client public (anon, sans session) — pour les pages publiques
function getSupabase() {
  if (!_db) {
    _db = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false } }
    )
  }
  return _db
}

// Client auth (avec JWT) — pour les fonctions admin qui nécessitent le RLS
function getAuthSb() {
  return createAuthClient()
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
  return mapPlan(data as Record<string, unknown>)
}

export async function getReviews(planId: number): Promise<Review[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('reviews').select('*').eq('plan_id', planId).order('created_at', { ascending: false })
  if (error || !data) return []
  return data as Review[]
}

export async function addReview(review: Omit<Review, 'id' | 'created_at'>): Promise<void> {
  const sb = getSupabase()
  await sb.from('reviews').insert(review as never)
}

export async function getEvents(): Promise<Event[]> {
  const sb = getSupabase()
  const { data, error } = await sb.from('events').select('*').eq('status', 'published').order('event_date')
  if (error || !data) return []
  return data.map(mapEvent)
}

export async function getImmoListings(type?: string): Promise<ImmoListing[]> {
  const sb = getSupabase()
  let query = sb.from('immo_listings').select('*').eq('status', 'published')
    .order('featured', { ascending: false }).order('created_at', { ascending: false })
  if (type && type !== 'all') query = query.eq('type', type)
  const { data, error } = await query
  if (error || !data) return []
  return (data as Record<string, unknown>[]).map(row => ({
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

export async function addTreRequest(data: {
  prenom: string; email: string; phone?: string; pays: string
  budget?: string; type_bien?: string; message?: string
}): Promise<void> {
  const sb = getSupabase()
  await sb.from('tre_requests').insert(data as never)
}

export async function addPlan(data: {
  title: string; cat: string; description: string; addr: string
  phone?: string; tags: string[]; user_id?: string
}): Promise<void> {
  const sb = getSupabase()
  await sb.from('plans').insert({ ...data, status: 'pending', rating: 0, rc: 0, featured: false } as never)
}


export async function getAdminStats(): Promise<{ plans: number; pending: number; events: number; users: number; immo: number }> {
  const sb = getAuthSb()
  const [plans, pending, events, immo] = await Promise.all([
    sb.from('plans').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    sb.from('plans').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
    sb.from('events').select('id', { count: 'exact', head: true }).eq('status', 'published'),
    sb.from('immo_listings').select('id', { count: 'exact', head: true }).eq('status', 'published'),
  ])
  return {
    plans: plans.count ?? 0,
    pending: pending.count ?? 0,
    events: events.count ?? 0,
    users: 0,
    immo: immo.count ?? 0,
  }
}

export async function getAllPlans(): Promise<(Plan & { status: string })[]> {
  const sb = getAuthSb()
  const { data, error } = await sb.from('plans').select('*').order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as Record<string, unknown>[]).map(row => ({ ...mapPlan(row), status: row.status as string }))
}

export async function getAllEvents(): Promise<(Event & { status: string })[]> {
  const sb = getAuthSb()
  const { data, error } = await sb.from('events').select('*').order('event_date', { ascending: false })
  if (error || !data) return []
  return (data as Record<string, unknown>[]).map(row => ({ ...mapEvent(row), status: row.status as string }))
}

export async function getAdminImmoListings(): Promise<ImmoListing[]> {
  const sb = getAuthSb()
  const { data, error } = await sb.from('immo_listings').select('*').order('created_at', { ascending: false })
  if (error || !data) return []
  return (data as Record<string, unknown>[]).map(row => ({
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

export async function getUsers(): Promise<{ id: string; full_name?: string; email?: string; role?: string; created_at?: string }[]> {
  const sb = getAuthSb()
  const { data, error } = await sb.from('profiles').select('*').order('created_at', { ascending: false })
  if (error || !data) return []
  return data as { id: string; full_name?: string; email?: string; role?: string; created_at?: string }[]
}

export async function updateUserRole(id: string, role: 'member' | 'admin'): Promise<void> {
  const sb = getAuthSb()
  await sb.from('profiles').update({ role } as never).eq('id', id)
}

export async function deletePlan(id: number): Promise<void> {
  const sb = getAuthSb()
  await sb.from('plans').delete().eq('id', id)
}

export async function deleteEvent(id: number): Promise<void> {
  const sb = getAuthSb()
  await sb.from('events').delete().eq('id', id)
}

export async function updatePlanStatus(id: number, status: 'published' | 'rejected'): Promise<void> {
  const sb = getAuthSb()
  await sb.from('plans').update({ status } as never).eq('id', id)
}

export async function addAdminEvent(data: {
  title: string; description: string; event_date: string
  event_time: string; loc: string; cat: string; attendees: number
}): Promise<void> {
  const sb = getAuthSb()
  await sb.from('events').insert({ ...data, status: 'published', featured: false } as never)
}

export async function uploadPlanImage(file: File): Promise<string | null> {
  const sb = getAuthSb()
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `plan-${Date.now()}.${ext}`
  const { error } = await sb.storage.from('plans').upload(path, file, { upsert: true })
  if (error) return null
  const { data } = sb.storage.from('plans').getPublicUrl(path)
  return data.publicUrl
}

export async function addAdminPlan(data: {
  title: string; cat: string; description: string; addr: string
  phone?: string; tags: string[]; img?: string
}): Promise<void> {
  const sb = getAuthSb()
  await sb.from('plans').insert({ ...data, status: 'published', rating: 0, rc: 0, featured: false } as never)
}

export async function updatePlan(id: number, data: {
  title?: string; cat?: string; description?: string; addr?: string
  phone?: string; tags?: string[]; img?: string; status?: string; featured?: boolean
}): Promise<void> {
  const sb = getAuthSb()
  await sb.from('plans').update(data as never).eq('id', id)
}
