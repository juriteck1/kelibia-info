'use client'
import { useState, useMemo, useEffect } from 'react'
import PlanCard from '@/components/PlanCard'
import { CATS } from '@/lib/data'
import { getPlans } from '@/lib/db'
import type { Plan } from '@/types'

export default function PlansPage() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('all')
  const [sort, setSort] = useState('rating')
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPlans().then(data => {
      setPlans(data)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    let list = [...plans]
    if (cat !== 'all') list = list.filter(p => p.cat === cat)
    if (q.trim()) list = list.filter(p =>
      p.title.toLowerCase().includes(q.toLowerCase()) ||
      p.desc.toLowerCase().includes(q.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(q.toLowerCase()))
    )
    if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else list.sort((a, b) => b.id - a.id)
