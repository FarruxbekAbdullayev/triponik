/**
 * CarRentFilterBar.tsx
 * Avto ijara natijalari uchun yuqori panel: orqaga, sarlavha/meta va bosh filter tugmalari.
 * Bu versiyada bosh filter tugmalari gorizontal scrollli qatorda joylashadi, siqilib ketmaydi.
 */

import React from 'react'
import { ArrowLeft, ChevronDown, MapPin, Users, SlidersHorizontal, CarFront } from 'lucide-react'
import { Button } from '../../../components/ui/button'

/** Panel props */
export interface CarRentFilterBarProps {
  /** Joylashuv (masalan, Los Angeles xalqaro aeroporti) */
  location: string
  /** Sana va vaqt oralig'i (masalan, 10:00, 13 Avg — 10:00, 16 Avg) */
  meta: string
  /** Orqaga bosilganda */
  onBack?: () => void
}

/**
 * CarRentFilterBar
 * - Yuqori satr: orqaga, sarlavha, (o'ng tomonda bo'sh joy) — minimalizm.
 * - Keyingi satr: Saralash / Joylashuv / O‘rindiqlar / Filtrlar — gorizontal scroll.
 * - Tagida: o‘lcham chiplari (Kichik, O‘rta, Katta, SUV, VAN, Premium, Sport, Pickup).
 */
export default function CarRentFilterBar({ location, meta, onBack }: CarRentFilterBarProps) {
  /** O‘lcham/klass chiplari ro‘yxati (UI) */
  const sizeChips: string[] = ['Kichik', 'O‘rta', 'Katta', 'SUV', 'VAN', 'Premium', 'Sport', 'Pickup']

  return (
    <div className="sticky top-0 z-20 w-full backdrop-blur supports-[backdrop-filter]:bg-white/70">
      {/* Yuqori satr */}
      <div className="flex items-center justify-between px-4 pt-3">
        <button
          aria-label="Orqaga"
          onClick={onBack}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-slate-900 line-clamp-1">{location}</div>
          <div className="text-[11px] text-slate-500">{meta}</div>
        </div>
        <div className="h-8 w-8" />
      </div>

      {/* Bosh filtr tugmalari: gorizontal scroll qator
          Maqsad: tugmalar siqilib ketmasligi uchun shrink-0; kontent ko'p bo'lsa, yon tomonga surib ko'rish. */}
      <div className="mt-3 px-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button
            variant="outline"
            className="bg-transparent shrink-0 inline-flex items-center justify-center gap-1 rounded-xl py-2 px-3 text-sm"
          >
            <span>Saralash</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent shrink-0 inline-flex items-center justify-center gap-1 rounded-xl py-2 px-3 text-sm"
          >
            <MapPin className="h-4 w-4" />
            <span>Joylashuv</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent shrink-0 inline-flex items-center justify-center gap-1 rounded-xl py-2 px-3 text-sm"
          >
            <Users className="h-4 w-4" />
            <span>O‘rindiqlar</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="bg-transparent shrink-0 inline-flex items-center justify-center gap-1 rounded-xl py-2 px-3 text-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span>Filtrlar</span>
          </Button>
        </div>
      </div>

      {/* O'lcham chiplari: gorizontal scroll + shrink-0 */}
      <div className="mt-2 flex gap-2 overflow-x-auto px-4 pb-3">
        {sizeChips.map((label) => (
          <SizeChip key={label} label={label} />
        ))}
      </div>
    </div>
  )
}

/** Kichik chip tugma (faqat UI) */
function SizeChip({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="shrink-0 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
    >
      <CarFront className="h-3.5 w-3.5" />
      <span>{label}</span>
    </button>
  )
}
