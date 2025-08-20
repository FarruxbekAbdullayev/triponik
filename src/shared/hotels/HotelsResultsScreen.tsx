/**
 * HotelsResultsScreen.tsx
 * Mehmonxona qidiruv natijalari: Istanbul namunasi, filter paneli va kartalar ro'yxati (UZ).
 */

import React from 'react'
import HotelsFilterBar from './components/HotelsFilterBar'
import HotelCard from './components/HotelCard'
import { demoHotels } from './types'
import { useNavigate } from 'react-router'

/** Props: overlay rejimida orqaga yopish uchun optional onBack */
export interface HotelsResultsScreenProps {
  /** Orqaga bosilganda (overlayni yopish uchun) */
  onBack?: () => void
  /** Sarlavha uchun shahar nomi */
  city?: string
  /** Meta matn (sana va mehmonlar) */
  meta?: string
  /** Jami topilgan variantlar soni */
  total?: number
}

/**
 * HotelsResultsScreen
 * - Sarlavha + Filtrlar/Xarita tugmalari (UZ)
 * - "Oldingi qidiruvdan filtrlar" karta
 * - Mehmonxona kartalari ro'yxati
 */
export default function HotelsResultsScreen(props: HotelsResultsScreenProps) {
  const nav = useNavigate()
  const handleBack = () => {
    if (props.onBack) return props.onBack()
    nav('/')
  }

  const city = props.city ?? 'Istanbul'
  const meta = props.meta ?? '11 Avg – 12 Avg, 2 mehmon'
  const total = props.total ?? 2512

  return (
    <div className="mx-auto max-w-md min-h-full">
      <HotelsFilterBar city={city} meta={meta} total={total} onBack={handleBack} />

      {/* Oldingi filtrlardan: banner/karta */}
      <div className="px-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-3">
          <div className="mb-1 flex items-start justify-between">
            <div className="text-[15px] font-semibold text-slate-900">Oldingi qidiruvdan filtrlar</div>
            <button
              aria-label="Yopish"
              className="h-6 w-6 rounded-full text-slate-400 hover:bg-slate-100"
            >
              ×
            </button>
          </div>
          <div className="text-sm text-slate-600">To‘lov va bron</div>
          <div className="pt-2">
            <button className="inline-flex items-center rounded-xl border border-slate-300 bg-transparent px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              Yoqish
            </button>
          </div>
        </div>

        <div className="py-3 text-center text-sm font-medium text-slate-600">{total} ta variant topildi</div>
      </div>

      {/* Ro'yxat – vertikal scroll asosiy overlay konteynerida ta'minlanadi */}
      <div className="space-y-4 px-4 pb-8">
        {demoHotels.map((h) => (
          <HotelCard key={h.id} hotel={h} />
        ))}
      </div>
    </div>
  )
}
