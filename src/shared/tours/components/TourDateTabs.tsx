/** 
 * TourDateTabs.tsx
 * Tur natijalari ustida joylashadigan sanalar + minimal narx tabs komponenti (UZ).
 * - 7 kunlik oynani ko'rsatadi, gorizontal skroll.
 * - Aktiv element ostida brand indikator chiziq.
 * - Narx USD formatida.
 * - size: 'sm' | 'md' bilan ixcham ko'rinishni boshqarish.
 * - Sana va narx matnlari bir qatordan oshmasligi uchun `whitespace-nowrap` qo'llanadi.
 * - Har bir tab kengligi kontent uzunligiga teng (w-fit), ortiqcha bo'sh joy yo'q.
 */

import React, { useMemo, useState } from 'react'

/** TourDateTabs props */
export interface TourDateTabsProps {
  /** Boshlang'ich sana (default: bugun) */
  startDate?: Date
  /** Kunlar soni (default: 7) */
  days?: number
  /** Tanlangan sana o'zgarganda */
  onChange?: (date: Date) => void
  /** Qo'shimcha class */
  className?: string
  /** 
   * inset: true bo'lsa, tashqi konteyner ichida ishlatiladi.
   * Ichki horizontal padding o'chiriladi (konteyner allaqachon px-4 bo'lsa).
   */
  inset?: boolean
  /** Vizual o'lcham: 'sm' ixcham, 'md' standart (default: 'md') */
  size?: 'sm' | 'md'
}

/** UZ oy nomlari */
const uzMonths = [
  'yanvar',
  'fevral',
  'mart',
  'aprel',
  'may',
  'iyun',
  'iyul',
  'avgust',
  'sentyabr',
  'oktyabr',
  'noyabr',
  'dekabr',
]

/** UZ hafta kunlari (qisqartma) */
const uzWeekdays = ['yak', 'du', 'se', 'chor', 'pay', 'ju', 'sh']

/**
 * formatUSD
 * Narxni USD ko'rinishida formatlaydi (masalan: $1,240).
 */
function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * pseudoPrice
 * USD uchun realistik diapazon hosil qiladi.
 * - Bazaviy ~1200 USD, +/- ~40%, 10 USD gacha yaxlitlash.
 */
function pseudoPrice(seed: number): number {
  const base = 1_200
  const delta = ((seed * 9301 + 49297) % 233280) / 233280 // 0..1
  const k = 0.6 + delta * 0.8 // 0.6..1.4
  const raw = Math.round((base * k) / 10) * 10 // 10 USD gacha yaxlitlash
  return Math.max(400, raw)
}

/** Sana matnini UZ tilida qaytaradi: "22 avgust, ju" */
function formatUzDate(d: Date): string {
  const day = d.getDate()
  const month = uzMonths[d.getMonth()]
  const weekday = uzWeekdays[d.getDay()]
  return `${day} ${month}, ${weekday}`
}

/**
 * TourDateTabs
 * Gorizontal sanalar ro'yxati; har birida minimal narx ("{USD} dan") yoki "Narxni bilish".
 * - Sana va narx matni qatordan oshmasligi uchun nowrap qo'llanadi.
 * - Har bir tab kengligi kontentga teng (w-fit), min-width yo'q — ortiqcha bo'sh joy qolmaydi.
 */
export function TourDateTabs({
  startDate,
  days = 7,
  onChange,
  className,
  inset,
  size = 'md',
}: TourDateTabsProps) {
  const start = useMemo(() => startDate ?? new Date(), [startDate])

  // Itemlar: sana + narx (ba'zilariga narx bermaymiz)
  const items = useMemo(() => {
    return Array.from({ length: days }, (_, i) => {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      // Har 4-kun "Narxni bilish"
      const hasPrice = i % 4 !== 3
      const price = hasPrice ? pseudoPrice(d.getDate() + d.getMonth() * 31) : undefined
      return { date: d, label: formatUzDate(d), price }
    })
  }, [start, days])

  const [active, setActive] = useState(0)

  /** Elementni tanlash */
  function select(i: number) {
    setActive(i)
    onChange?.(items[i].date)
  }

  // Ichki padding: inset bo'lsa 0, aks holda px-4
  const innerPad = inset ? 'px-0' : 'px-4'

  // O'lchamga bog'liq sinflar
  const padY = size === 'sm' ? 'py-2' : 'py-3'
  const gap = size === 'sm' ? 'gap-4' : 'gap-6'
  const labelText = size === 'sm' ? 'text-xs' : 'text-sm'
  const priceText = size === 'sm' ? 'text-sm' : 'text-base'
  const bottomPad = size === 'sm' ? 'pb-1.5' : 'pb-2'
  const indicatorW = size === 'sm' ? 'w-10/12' : 'w-11/12'

  return (
    <div
      className={[
        'bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="overflow-x-auto">
        <div
          role="tablist"
          aria-label="Sanalar"
          className={['flex', gap, padY, innerPad].join(' ')}
        >
          {items.map((it, i) => {
            const isActive = i === active
            return (
              <button
                key={i}
                role="tab"
                aria-selected={isActive}
                onClick={() => select(i)}
                className={[
                  // W-fit: kenglik kontentga teng; inline-flex: ustma-ust matnlar
                  'relative w-fit inline-flex flex-col items-start text-left outline-none',
                  bottomPad,
                  it.price ? 'text-slate-700' : 'text-slate-400',
                  'focus-visible:ring-2 focus-visible:ring-[#3050F9]/40 rounded',
                ].join(' ')}
              >
                <div className={['tracking-tight', labelText, 'whitespace-nowrap leading-tight'].join(' ')}>
                  {it.label}
                </div>
                <div
                  className={[
                    'mt-1',
                    priceText,
                    'whitespace-nowrap leading-tight',
                    it.price ? 'font-semibold text-slate-900' : 'text-slate-400',
                  ].join(' ')}
                >
                  {it.price ? `${formatUSD(it.price)} dan` : 'Narxni bilish'}
                </div>
                {isActive && (
                  <div
                    className={[
                      'absolute bottom-0 left-0 right-0 mx-auto h-0.5 rounded bg-[#3050F9]',
                      indicatorW,
                    ].join(' ')}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TourDateTabs
