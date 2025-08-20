/**
 * FlightResultsScreen.tsx
 * Samolyot qidiruvi natijalari uchun demo sahifa (mobil ilhomlangan UI).
 * - O'zbekcha UI
 * - onBack qo'llab-quvvatlanadi: berilsa, router o'rniga shu callback ishlaydi.
 */

import React, { useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { FlightOffer, DayTab } from './types'
import FilterChips, { FiltersState } from './components/FilterChips'
import DateTabs from './components/DateTabs'
import FlightCard from './components/FlightCard'

/** Optional props: ichki overlaydan chaqirilganda orqaga qaytish */
export interface FlightResultsScreenProps {
  /** Orqaga tugmasi bosilganda chaqiriladi (ixtiyoriy) */
  onBack?: () => void
}

/**
 * Demo: sana chiplari
 */
const DAY_TABS: DayTab[] = [
  { label: '13 aug, wed', priceRub: 8999 },
  { label: '14 aug, thu', priceRub: 8669 },
  { label: '15 aug, fri', priceRub: 9240 },
  { label: '16 aug, sat', priceRub: 9100 },
  { label: '17 aug, sun', priceRub: 9050 },
]

/**
 * Demo: parvoz takliflari
 */
const OFFERS: FlightOffer[] = [
  {
    id: 'ural-0610',
    airline: 'Ural Airlines',
    rating: 8.1,
    departTime: '6:10',
    arriveTime: '10:35',
    duration: "4 soat 25 daqiqa yo'lda",
    fromAirport: 'Pulkovo',
    toAirport: 'Sochi',
    dateLabel: '14 aug, thu',
    fromCity: 'Sankt-Peterburg',
    toCity: 'Sochi',
    direct: true,
    priceRub: 8669,
    baggagePriceRub: 3059,
    cheapest: true,
  },
  {
    id: 'ural-1635',
    airline: 'Ural Airlines',
    rating: 8.1,
    departTime: '16:35',
    arriveTime: '21:00',
    duration: "4 soat 25 daqiqa yo'lda",
    fromAirport: 'Pulkovo',
    toAirport: 'Sochi',
    dateLabel: '14 aug, thu',
    fromCity: 'Sankt-Peterburg',
    toCity: 'Sochi',
    direct: true,
    priceRub: 8669,
    baggagePriceRub: 3059,
  },
]

/**
 * FlightResultsScreen
 * - Binafsha sarlavha paneli
 * - Filtr chiplar + sana chiplari
 * - Demo kartalar ro'yxati
 */
export function FlightResultsScreen({ onBack }: FlightResultsScreenProps) {
  const nav = useNavigate()
  const [filters, setFilters] = useState<FiltersState>({
    direct: true,
    baggage: false,
    refundable: false,
  })
  const [activeDay, setActiveDay] = useState(1)

  // Demo: filtrlar logikasi (faqat direct flagiga eng sodda filter)
  const items = useMemo(() => {
    let list = OFFERS
    if (filters.direct) {
      list = list.filter((o) => o.direct)
    }
    // baggage/refundable demo holatda ro‘yxatni o‘zgartirmaydi, UI uchun placeholder.
    return list
  }, [filters])

  return (
    <div className="page-enter min-h-screen bg-slate-50">
      {/* Header */}
      <div className="rounded-b-3xl 
bg-[#0F172A]
 pb-4 pt-3 text-white">
        <div className="mx-auto flex max-w-md items-center gap-3 px-4">
          <button
            aria-label="Orqaga"
            onClick={() => {
              if (onBack) onBack()
              else nav(-1)
            }}
            className="rounded-full p-2 text-white/80 hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-lg font-semibold">Sankt-Peterburg — Sochi</div>
            <div className="text-[11px] text-white/80">14 aug, thu • 1 yo‘lovchi • Economy</div>
          </div>
        </div>

        {/* Filter chips (to‘q fon ustida) */}
        <div className="mx-auto mt-3 max-w-md px-4">
          <FilterChips value={filters} onChange={setFilters} tone="dark" />
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-md px-4 pb-6">
        {/* Title + sub */}
        <div className="mt-4 text-slate-800">
          <div className="text-base font-semibold">23 ta taklif, avvalo tavsiya etilganlari</div>
          <div className="text-[11px] text-slate-500">Mahalliy vaqt. Narx 1 yo‘lovchi uchun</div>
        </div>

        {/* Date tabs */}
        <div className="mt-3">
          <DateTabs days={DAY_TABS} activeIndex={activeDay} onChange={setActiveDay} />
        </div>

        {/* Cheapest badge */}
        {items[0]?.cheapest && (
          <div className="mt-3 inline-flex rounded-xl border border-emerald-300 bg-emerald-50/80 px-2 py-1 text-xs font-semibold text-emerald-700">
            Eng arzon
          </div>
        )}

        {/* Cards */}
        <div className="mt-3 space-y-3">
          {items.map((o) => (
            <FlightCard key={o.id} offer={o} />
          ))}
        </div>

        {/* Pastki bo'sh joy */}
        <div className="h-10" />
      </div>
    </div>
  )
}

export default FlightResultsScreen
