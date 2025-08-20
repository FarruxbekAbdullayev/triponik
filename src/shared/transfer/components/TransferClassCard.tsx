/**
 * TransferClassCard.tsx
 * Transfer klassi uchun vizual karta: rasm, meta, narx va eslatma.
 * Eslatma: "Tanlash" tugmasi olib tashlangan (faqat ma'lumot ko'rsatiladi).
 */

import React from 'react'
import { Users, Info } from 'lucide-react'
import type { TransferClass } from '../types'
import { formatUZS } from '../types'

/** Komponent propslari */
export interface TransferClassCardProps {
  /** Transfer klassi obyekt */
  item: TransferClass
  /** Bosilganda (masalan, tanlash) — hozircha ishlatilmaydi */
  onSelect?: (id: string) => void
}

/**
 * TransferClassCard
 * Light tema: oq karta; o'ng yuqorida narx, pastda eslatma.
 * "Misollar" matni kartaning to'liq kengligida va bitta qatorda (truncate) ko'rsatiladi.
 * Rasm: smart placeholder orqali item.imageKey ga mos avtomobil rasmi.
 * Badge: rasm ustida yuqori chap burchakda ko'rsatiladi (agar mavjud bo'lsa).
 */
export default function TransferClassCard({ item }: TransferClassCardProps) {
  /** Smart placeholder URL: item.imageKey ga mos rasm (masalan, "white sedan", "blue sedan") */
  const imageSrc = `https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/14bce901-34f0-4cea-842b-6bf3aad393ba.jpg`

  return (
    <div className="rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm overflow-hidden">
      {/* Rasm paneli */}
      <div className="relative h-36 bg-slate-100">
        <img
          src={imageSrc}
          className="object-cover h-full w-full"
          alt={item.name}
        />
        {/* Badge: rasm ustida yuqori chap burchak */}
        {item.badge && (
          <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#3050F9]/90 px-2 py-0.5 text-[11px] font-medium text-white ring-1 ring-[#3050F9]/90 shadow-sm">
            {item.badge}
          </div>
        )}
      </div>

      {/* Kontent */}
      <div className="p-4">
        {/* Sarlavha va narx */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="text-base font-semibold text-slate-900">{item.name}</div>
            <div className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-600">
              <Users className="h-3.5 w-3.5" />
              <span>gacha {item.passengers} yo‘lovchi</span>
            </div>
          </div>
          <div className="shrink-0">
            <div className="rounded-lg bg-slate-50 px-2.5 py-1 text-sm font-semibold text-slate-900 ring-1 ring-slate-200">
              {formatUZS(item.price)}
            </div>
          </div>
        </div>

        {/* Misollar qatori: to'liq kenglik + bitta qator (truncate) */}
        <div className="mt-1 w-full text-xs text-slate-500 truncate">
          {item.examples}
        </div>

        {/* Pastki eslatma */}
        <div className="mt-3 flex items-start gap-2 text-[11px] text-slate-500">
          <Info className="mt-0.5 h-3.5 w-3.5" />
          <span>Yo‘lga chiqishdan kamida 6 soat oldin bron qiling.</span>
        </div>
      </div>
    </div>
  )
}
