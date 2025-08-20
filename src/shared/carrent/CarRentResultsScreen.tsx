/**
 * CarRentResultsScreen.tsx
 * Avto ijara qidiruv natijalari: yuqori panel, bosh filtr tugmalari, o'lcham chiplar va kartalar ro'yxati (UZ).
 */

import React from 'react'
import { useNavigate } from 'react-router'
import CarRentFilterBar from './components/CarRentFilterBar'
import CarCard from './components/CarCard'
import { demoCars } from './types'

/** Props: overlay rejimida orqaga yopish uchun optional onBack */
export interface CarRentResultsScreenProps {
  /** Orqaga bosilganda (overlayni yopish uchun) */
  onBack?: () => void
  /** Sarlavha uchun joylashuv */
  location?: string
  /** Meta matn (sana/vaqt) */
  meta?: string
}

/**
 * CarRentResultsScreen
 * - HotelsResultsScreen'ga o'xshash tuzilma
 * - Hech qanday "Exclusive offers" banneri yo'q
 */
export default function CarRentResultsScreen(props: CarRentResultsScreenProps) {
  const nav = useNavigate()
  const handleBack = () => {
    if (props.onBack) return props.onBack()
    nav('/')
  }

  const location = props.location ?? "Los Angeles xalqaro aeroporti"
  const meta = props.meta ?? "10:00, 13 Avg — 10:00, 16 Avg"

  return (
    <div className="mx-auto max-w-md">
      <CarRentFilterBar location={location} meta={meta} onBack={handleBack} />

      {/* Promo codes qatori (oddiy statik UI, ixtiyoriy) */}
      <div className="px-4 pt-3">
        <div className="flex items-center justify-between rounded-2xl border border-pink-200 bg-pink-50 px-3 py-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="rounded-md bg-white px-2 py-0.5 text-[11px] font-bold text-pink-600 ring-1 ring-pink-200">8% Off</span>
            <span className="font-medium text-slate-800">Promo kodlar</span>
          </div>
          <button className="rounded-xl border border-pink-200 bg-white px-3 py-1.5 text-sm font-semibold text-pink-600 hover:bg-pink-50">
            Qabul qilish
          </button>
        </div>
      </div>

      {/* Ro'yxat */}
      <div className="space-y-4 px-4 py-4 pb-8">
        {demoCars.map((c) => (
          <CarCard key={c.id} car={c} />
        ))}
      </div>
    </div>
  )
}
