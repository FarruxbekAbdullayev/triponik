/**
 * NavChipsBar.tsx
 * Home sahifa ichida navigatsiya uchun gorizontal chips navbar.
 * Logodan pastda joylashadi, bosilganda bo‘limlarga silliq scroll qiladi.
 * Sticky top-0: sahifa oxirigacha yuqorida qoladi.
 */

import React, { useState } from 'react'

/** Navigatsiya kalitlari (bo‘limlar) */
export type NavKey = 'deals' | 'weekend' | 'popular' | 'features'

/** Bitta chip elementi */
export interface NavChipItem {
  /** Ko‘rinadigan nom */
  label: string
  /** Bo‘lim identifikatori */
  value: NavKey
}

/** NavChipsBar propslari */
export interface NavChipsBarProps {
  /** Chiplar ro‘yxati (default to‘rtlik) */
  items?: NavChipItem[]
  /** Bosilganda chaqiriladigan handler */
  onNavigate?: (key: NavKey) => void
  /** Ixtiyoriy className */
  className?: string
}

/** Default chiplar — UI ko‘rinishi uchun */
const DEFAULT_ITEMS: NavChipItem[] = [
  { label: 'Bu foydali!', value: 'deals' },
  { label: 'Dam olish kunlari', value: 'weekend' },
  { label: 'Ommabop', value: 'popular' },
  { label: 'Foydali usullar', value: 'features' },
]

/**
 * NavChipsBar
 * Gorizontal scroll bo‘ladigan chiplar navbari (sticky).
 * Muhim:
 * - Fon: oq (bg-white), shaffof/blur yo‘q.
 * - Ichki px-4 qo‘shildi, pastdagi konteynerlar bilan bir xil hizalanadi.
 */
export function NavChipsBar({ items, onNavigate, className }: NavChipsBarProps) {
  const data = items && items.length ? items : DEFAULT_ITEMS
  const [active, setActive] = useState<NavKey>('deals')

  /** Tanlangan bo‘limga navigatsiya qilish */
  function handleClick(key: NavKey) {
    setActive(key)
    onNavigate?.(key)
  }

  return (
    <div
      className={[
        // Sticky header: butun sahifa davomida yuqorida
        'sticky top-0 z-30',
        // Oq fon va pastki chiziq
        'bg-white border-b border-slate-100',
        className ?? '',
      ].join(' ')}
      aria-label="Sahifa bo‘limlari uchun navigatsiya"
    >
      {/* Pastdagi bloklar bilan bir xil chap/o‘ng padding */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.map((it) => {
            const isActive = it.value === active
            return (
              <button
                key={it.value}
                type="button"
                onClick={() => handleClick(it.value)}
                className={[
                  'whitespace-nowrap rounded-full px-3 py-1.5 text-xs ring-1 transition',
                  isActive
                    ? 'bg-[#3050F9] text-white ring-[#3050F9]'
                    : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
                ].join(' ')}
                aria-pressed={isActive}
              >
                {it.label}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default NavChipsBar
