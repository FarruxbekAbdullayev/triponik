/**
 * HotelCard.tsx
 * Mehmonxona taklif kartasi — rasm, nom, masofa, badge'lar, narx (so'm) va meta (UZ).
 */

import React from 'react'
import type { Hotel } from '../types'
import { Heart } from 'lucide-react'

/** HotelCard props */
export interface HotelCardProps {
  /** Ko'rsatiladigan mehmonxona */
  hotel: Hotel
}

/** so'm format (UZ) */
function formatSum(n: number) {
  try {
    return new Intl.NumberFormat('uz-UZ').format(n) + ' so‘m'
  } catch {
    return `${n.toLocaleString()} so‘m`
  }
}

/**
 * HotelCard
 * - Yuqorida rasm, o'ng yuqorida "like" tugmasi
 * - Pastda nom, masofa, badge/chegirmalar va narx (so'm)
 */
export function HotelCard({ hotel }: HotelCardProps) {
  const hasDiscount = !!hotel.oldPriceSum && (hotel.oldPriceSum as number) > hotel.priceSum
  const discountPct = hasDiscount
    ? Math.round(((hotel.oldPriceSum as number) - hotel.priceSum) / (hotel.oldPriceSum as number) * 100)
    : null

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative h-44 w-full">
        <img
          src={hotel.imageUrl || 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/94111382-2644-4e22-be5a-5065efccd520.jpg'}
          className="h-full w-full object-cover"
          alt={hotel.name}
        />
        <button
          aria-label="Saqlash"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800 shadow"
        >
          <Heart className="h-5 w-5" />
        </button>
      </div>

      <div className="space-y-1 p-3">
        <div className="flex items-center justify-between">
          <h3 className="line-clamp-1 text-[15px] font-semibold text-slate-900">{hotel.name}</h3>
          {typeof hotel.rating === 'number' && (
            <div className="inline-flex min-w-8 items-center justify-center rounded-md bg-emerald-500 px-1.5 py-0.5 text-[13px] font-bold text-white">
              {hotel.rating}
            </div>
          )}
        </div>

        {typeof hotel.distanceKm === 'number' && (
          <div className="text-xs text-slate-500">{hotel.distanceKm} km — shahar markazidan</div>
        )}

        {/* Badge va chegirmalar */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {hasDiscount && discountPct !== null && (
            <span className="inline-flex items-center rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              -{discountPct}%
            </span>
          )}
          {(hotel.badges || []).map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-700"
            >
              {b}
            </span>
          ))}
        </div>

        {/* Narxlar */}
        <div className="mt-1 flex items-end gap-2">
          {hotel.oldPriceSum && (
            <div className="text-sm text-slate-400 line-through">{formatSum(hotel.oldPriceSum)}</div>
          )}
          <div className="text-lg font-extrabold tracking-tight text-slate-900">{formatSum(hotel.priceSum)}</div>
        </div>
        <div className="pb-2 text-xs text-slate-600">
          {hotel.nights} tun, {hotel.guests} mehmon
        </div>
      </div>
    </div>
  )
}

export default HotelCard
