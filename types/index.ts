export interface Plan {
  id: number
  title: string
  cat: string
  desc: string
  addr: string
  phone?: string
  rating: number
  rc: number
  tags: string[]
  featured: boolean
  img: string
  map?: string
  created_at?: string
}

export interface Review {
  id: number
  plan_id: number
  author: string
  user_id?: string
  rating: number
  comment: string
  created_at: string
}

export interface Event {
  id: number
  title: string
  desc: string
  date: string
  time: string
  loc: string
  cat: string
  img: string
  attendees: number
  featured: boolean
  created_at?: string
}

export interface AnnuaireItem {
  id: number
  name: string
  cat: string
  desc: string
  addr: string
  phone?: string
  email?: string
  website?: string
  rating: number
  rc: number
  img: string
  created_at?: string
}

export interface ImmoListing {
  id: number
  title: string
  type: 'vente' | 'location' | 'vacances'
  price: number
  surface: number
  rooms: number
  beds: number
  addr: string
  desc: string
  img: string
  agent_name?: string
  agent_phone?: string
  featured: boolean
  created_at?: string
}

export type Category = {
  id: string
  label: string
  bc: string
}
