/**
 * ChipsFilterBar.tsx
 * Stories ustida ko'rsatiladigan gorizontal chip tugmalar paneli (filterlar).
 * Dizayn: sticky top, gradient fon, blur va gorizontal scroll.
 */

import React from 'react'

/** Chip element interfeysi */
export interface ChipItem {
  /** Ko‘rinadigan nom */
  label: string
}

/** ChipsFilterBar propslari */
export interface ChipsFilterBarProps {
  /** Ko‘rsatiladigan chiplar ro‘yxati */
  items?: ChipItem[]
  /** Aktiv chip indeksi (default: 0) */
  activeIndex?: number
  /** Aktiv chip o‘zgarganda chaqiriladi */
  onChange?: (index: number) => void
  /** Ixtiyoriy className qo‘shimcha bezaklar uchun */
  className?: string
}

/** Default chiplar */
const DEFAULT_CHIPS: ChipItem[] = [
  { label: 'Bu foydali!' },
  { label: 'Dam olish kunlari' },
  { label: 'Ommabop' },
  { label: 'Foydali usullar' },
]

/**
 * ChipsFilterBar
 * Stories tepasida joylashadigan filtr chiplar paneli.
 */
export function ChipsFilterBar({
  items,
  activeIndex = 0,
  onChange,
  className,
}: ChipsFilterBarProps) {
  const data = items && items.length ? items : DEFAULT_CHIPS

  return (
    <div
      className={[
        'sticky top-0 z-10 -mt-3',
        'bg-gradient-to-b from-white to-white/90',
        'px-4 pt-3 backdrop-blur',
        className ?? '',
      ].join(' ')}
    >
      <div className="flex gap-2 overflow-x-auto pb-2">
        {data.map((chip, idx) => {
          const isActive = idx === activeIndex
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() => onChange?.(idx)}
              className={[
                'whitespace-nowrap rounded-full px-3 py-1.5 text-xs ring-1 transition',
                isActive
                  ? 'bg-[#3050F9] text-white ring-[#3050F9]'
                  : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
              ].join(' ')}
              aria-pressed={isActive}
            >
              {chip.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default ChipsFilterBar
