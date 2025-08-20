/**
 * TourCard.tsx
 * Tur varianti uchun karta: rasm, rasm ustida badge'lar, reyting, meta va CTA.
 */

import React, { useMemo } from 'react'
import { Star, Plane, Info } from 'lucide-react'
import type { TourItem } from '../types'
import { formatUZS } from '../../transfer/types'

/** Komponent propslari */
export interface TourCardProps {
  /** Element ma'lumoti */
  item: TourItem
  /** CTA bosilganda */
  onShow?: (id: string) => void
}

/**
 * Badge komponenti: soddalashtirilgan chip
 */
function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[11px] font-medium text-slate-800 ring-1 ring-slate-200 shadow-sm">
      {children}
    </div>
  )
}

/**
 * Yulduzlar chizish: 0..5
 */
function Stars({ value }: { value: number }) {
  const list = useMemo(() => Array.from({ length: 5 }, (_, i) => i < Math.round(value)), [value])
  return (
    <div className="inline-flex items-center gap-0.5">
      {list.map((full, i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${full ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
      ))}
    </div>
  )
}

/**
 * TourCard
 * - Rasm: smart placeholder (item.imageKey)
 * - Rasm ustida chap yuqorida badge'lar
 * - Pastda meta va katta CTA
 */
export default function TourCard({ item, onShow }: TourCardProps) {
  const imageSrc = `https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/9b932988-e652-4176-b7d9-107afa8f4629.jpg`

  return (
    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm">
      {/* Rasm va badge'lar */}
      <div className="relative h-44 bg-slate-100">
        <img src={imageSrc} alt={item.name} className="object-cover w-full h-full" />
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
          {item.lowAvailability && <Chip>Mavjud joylar kam</Chip>}
          <Chip>Oy davomida {item.bookedPerMonth} marta bron qilingan</Chip>
        </div>
      </div>

      {/* Kontent */}
      <div className="p-4">
        {/* Reyting va renovatsiya */}
        <div className="flex items-center gap-3 text-xs text-slate-600">
          <div className="inline-flex items-center gap-1">
            <Stars value={item.rating} />
            <span className="font-medium text-slate-800">{item.rating.toFixed(1)}</span>
          </div>
          <div className="h-3 w-px bg-slate-200" />
          <div>Yil renovatsiyasi: {item.renovationYear}</div>
        </div>

        {/* Nomi va joylashuvi */}
        <div className="mt-1 text-base font-semibold text-slate-900">{item.name}</div>
        <div className="mt-0.5 text-sm text-slate-600">
          {item.country}, {item.city} · {item.distanceToBeach} m plyajgacha
        </div>

        {/* Qo'shimcha meta */}
        <div className="mt-2 inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-700 ring-1 ring-slate-200">
          <Plane className="h-3.5 w-3.5" />
          <span>Parvoz kiritilgan</span>
        </div>

        {/* CTA */}
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onShow?.(item.id)}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-[#3050F9] px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
          >
            Turlarni ko‘rsatish
          </button>
          <div className="shrink-0 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200">
            {formatUZS(item.price)}
          </div>
        </div>

        {/* Izoh */}
        <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5" />
          <span>Takliflar soni cheklangan. Eng yaxshi narxlar tezda tugashi mumkin.</span>
        </div>
      </div>
    </div>
  )
}