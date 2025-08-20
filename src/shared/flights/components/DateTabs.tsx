/**
 * DateTabs.tsx
 * Gorizontal scroll qilinadigan sana chiplari — brand accent (#3050F9), narx so‘mda.
 */

import React from 'react'
import type { DayTab } from '../types'

/** DateTabs komponenti props */
export interface DateTabsProps {
  days: DayTab[]
  activeIndex: number
  onChange: (index: number) => void
}

/**
 * DateTabs
 * - Faol element: brand fon (#3050F9) + oq matn
 * - Narx badge: brandga mos ranglar
 */
export function DateTabs({ days, activeIndex, onChange }: DateTabsProps) {
  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex min-w-max items-center gap-2">
        {days.map((d, i) => {
          const active = i === activeIndex
          return (
            <button
              key={i}
              onClick={() => onChange(i)}
              className={[
                'group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs',
                active
                  ? 'border-[#3050F9] bg-[#3050F9] text-white shadow-sm'
                  : 'border-slate-200 bg-white text-slate-700',
              ].join(' ')}
            >
              <span className="whitespace-nowrap">{d.label}</span>
              {typeof d.priceRub === 'number' && (
                <span
                  className={[
                    'rounded-md px-1.5 py-0.5 text-[10px] font-semibold ring-1',
                    active
                      ? 'bg-white/15 text-white ring-white/20'
                      : 'bg-[#3050F9]/10 text-[#3050F9] ring-[#3050F9]/20',
                  ].join(' ')}
                >
                  {formatSum(d.priceRub)}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/** so‘m format */
function formatSum(n: number) {
  return new Intl.NumberFormat('uz-UZ').format(n) + ' so‘m'
}

export default DateTabs
