/**
 * FlightCard.tsx
 * Parvoz taklifi kartasi: avia, vaqtlar, davomiylik, meta, narx va "tanlash" tugmasi.
 * Brand accent (#3050F9), valyuta — so‘m. Bagaj switchi shadcn UI Switch orqali.
 */

import React, { useState } from 'react'
import type { FlightOffer } from '../types'
import { ShieldCheck, Star } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Switch } from '../../../components/ui/switch'

/** FlightCard props */
export interface FlightCardProps {
  /** Ko'rsatiladigan taklif */
  offer: FlightOffer
}

/**
 * FlightCard
 * - Bagaj switch: ON -> brand (#3050F9), OFF -> slate-300
 * - Narx bagajga qarab dinamik hisoblanadi
 * - Shadcn UI Switch accessibility bilan
 */
export function FlightCard({ offer }: FlightCardProps) {
  const [withBaggage, setWithBaggage] = useState(false)

  /** Jami narx: bagaj ON bo‘lsa qo‘shimcha narx qo‘shiladi */
  const total = offer.priceRub + (withBaggage ? offer.baggagePriceRub || 0 : 0)

  /** Pastki izoh: holatga qarab matn */
  const fareNote = withBaggage ? 'Bagaj bilan, 1 kishi uchun' : 'Bagajsiz, 1 kishi uchun'

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      {/* Yuqori qator: avia + sharhlar + rating */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/553b2f7b-31dc-45ff-b949-2c3501c57c24.jpg" className="h-5 w-5 rounded object-cover" />
          <div className="text-sm font-medium text-slate-800">{offer.airline}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#3050F9] hover:underline">{'14,1K sharh'}</span>
          <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-100 px-1.5 py-0.5 text-xs font-semibold text-emerald-700">
            <Star className="h-3 w-3 fill-emerald-700 text-emerald-700" />
            {offer.rating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* Vaqtlar */}
      <div className="mt-2 grid grid-cols-2 items-end gap-2">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">{offer.departTime}</div>
        <div className="text-2xl text-right font-extrabold tracking-tight text-slate-900">{offer.arriveTime}</div>
        <div className="text-[11px] text-slate-500">{offer.dateLabel}</div>
        <div className="text-right text-[11px] text-slate-500">{offer.dateLabel}</div>
        <div className="text-xs text-slate-500">{offer.fromAirport}</div>
        <div className="text-right text-xs text-slate-500">{offer.toAirport}</div>
      </div>

      {/* Yo‘l vaqti + to‘g‘ridan-to‘g‘ri */}
      <div className="mt-1 flex items-center justify-between text-xs text-slate-600">
        <div>{offer.duration}</div>
        <div>{offer.direct ? "To‘g‘ridan-to‘g‘ri" : 'Tranzit'}</div>
      </div>

      {/* Pastki blok: bagaj + narx + tugma */}
      {typeof offer.baggagePriceRub === 'number' && (
        <div className="mt-3 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <div className="text-sm text-slate-700">
            Bagaj 23 kg
            <span className="text-slate-400"> + {formatSum(offer.baggagePriceRub)}</span>
          </div>

          {/* Shadcn UI Switch: ON (#3050F9), OFF (slate-300) */}
          {/* Thumb ON holatda 23px ga siljiydi (oldingi 24px 1px ortiq edi) */}
          <Switch
            checked={withBaggage}
            onCheckedChange={setWithBaggage}
            aria-label="Bagajni qo'shish"
            className={[
              'h-6 w-11',
              'data-[state=checked]:bg-[#3050F9]',
              'data-[state=unchecked]:bg-slate-300',
              // Thumb o‘lchami va harakati (override)
              '[&>span]:h-5 [&>span]:w-5',
              'data-[state=unchecked]:[&>span]:translate-x-0',
              'data-[state=checked]:[&>span]:!translate-x-[22px]', // 23px — trek chetiga aniq yetadi
              // Focus holati
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3050F9]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
            ].join(' ')}
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-xl font-extrabold text-slate-900">{formatSum(total)}</div>
          <div className="text-xs text-slate-500">{fareNote}</div>
        </div>
        <Button className="h-9 rounded-xl bg-[#3050F9] px-4 text-white hover:brightness-95">
          Chipta tanlash
        </Button>
      </div>

      {/* Pastki meta: "Oldindan bron..." */}
      <div className="mt-2 inline-flex items-center gap-1 text-xs text-[#3050F9]">
        <ShieldCheck className="h-4 w-4" />
        Oldindan bron qilish: 199 so‘m
      </div>
    </div>
  )
}

/** so‘m format */
function formatSum(n: number) {
  return new Intl.NumberFormat('uz-UZ').format(n) + ' so‘m'
}

export default FlightCard
