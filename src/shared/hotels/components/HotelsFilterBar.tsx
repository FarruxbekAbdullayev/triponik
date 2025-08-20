/**
 * HotelsFilterBar.tsx
 * Mehmonxona natijalari sarlavhasi va "Filtrlar/Xarita" tugmalari (UZ).
 * Tugmalar konteynerni to'liq to'ldiradi (har biri 50%), natija soni alohida qatorda.
 */

import React from 'react'
import { ArrowLeft, Search, SlidersHorizontal, Map as MapIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'

/**
 * Panel props
 * Sarlavha, meta va jami natijalar uchun parametrlar.
 */
export interface HotelsFilterBarProps {
  /** Shahar nomi */
  city: string
  /** Sana oralig'i va mehmonlar (masalan: "11 Avg – 12 Avg, 2 mehmon") */
  meta: string
  /** Ro'yxatdagi jami variantlar */
  total?: number
  /** Orqaga bosilganda */
  onBack?: () => void
}

/**
 * HotelsFilterBar
 * - Yuqori satr: orqaga, sarlavha, qidiruv.
 * - Keyingi satr: Filtrlar va Xarita tugmalari (50% + 50%).
 * - Natijalar soni: alohida qatorda, tugmalar bilan bir konteynerda emas.
 */
export function HotelsFilterBar({ city, meta, total, onBack }: HotelsFilterBarProps) {
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
          <div className="text-sm font-semibold text-slate-900">{city}</div>
          <div className="text-[11px] text-slate-500">{meta}</div>
        </div>
        <button
          aria-label="Qidiruv"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>

      {/* Filtrlar + Xarita: to'liq konteynerni to'ldirish */}
      <div className="mt-3 flex gap-3 px-4">
        <Button
          variant="outline"
          className="bg-transparent flex-1 justify-center inline-flex items-center gap-2 rounded-2xl px-3 py-5"
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filtrlar</span>
        </Button>
        <Button
          variant="outline"
          className="bg-transparent flex-1 justify-center inline-flex items-center gap-2 rounded-2xl px-3 py-5"
        >
          <MapIcon className="h-4 w-4" />
          <span>Xarita</span>
        </Button>
      </div>

      {/* Natijalar soni: alohida qatorda, tugmalar konteyneridan tashqarida */}
      {typeof total === 'number' && (
        <div className="px-4 pb-3 pt-2">
          <div className="text-center text-[13px] font-medium text-slate-600">
            {total} ta variant topildi
          </div>
        </div>
      )}
    </div>
  )
}

export default HotelsFilterBar
