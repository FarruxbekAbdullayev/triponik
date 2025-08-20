/** 
 * TabBar.tsx
 * Pastga yopishgan, ekranni to‘liq egallovchi quyi navigatsiya paneli.
 * Markazda "Qidiruv" doira tugmasi ko‘rinishidagi notch mavjud.
 * Notch aktiv tabga animatsiya bilan sirpanadi. Har bir ikon ostida label bor.
 */

import React, { useMemo } from 'react'
import { Search, Receipt, User, Home as HomeIcon, Newspaper } from 'lucide-react'

/** Tab kalitlari */
export type TabKey = 'home' | 'search' | 'orders' | 'benefits' | 'profile'

/** Bitta menyu elementi shakli */
interface TabItem {
  /** Ikonka komponenti */
  icon: React.ComponentType<{ size?: number; className?: string }>
  /** Ko‘rinadigan label (Uzbek) */
  label: string
  /** Unikal qiymat */
  value: TabKey
}

/** TabBar propslari */
interface TabBarProps {
  /** Faol tab */
  active: TabKey
  /** O‘zgarish hodisasi */
  onChange: (key: TabKey) => void
}

/**
 * IconButton
 * Ikonka + label vertikal joylashuvi; aktiv holatda notch ichidagi ikon dublini oldini olish uchun
 * bar ichidagi ikon pasaytiriladi/berkitiladi.
 */
function IconButton({
  item,
  active,
  onClick,
}: {
  item: TabItem
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'relative flex h-full w-full flex-col items-center justify-center',
        'transition',
        active ? 'text-white' : 'text-white/70 hover:text-white',
        'py-1.5',
      ].join(' ')}
      aria-label={item.label}
      aria-pressed={active}
    >
      {/* Ikona joyi */}
      <div className="flex h-6 w-6 items-center justify-center">
        <item.icon size={20} className={active ? 'opacity-0' : ''} />
      </div>
      <div
        className={[
          'mt-1 text-[11px] leading-none',
          active ? 'text-white' : 'text-white/70',
        ].join(' ')}
      >
        {item.label}
      </div>
    </button>
  )
}

/**
 * TabBar
 * - Pastga yopishgan, chap/o‘ng bo‘shliqsiz to‘liq kenglik
 * - Yuqoridan oyma (notch) doirasi aktiv elementga mos joyga silliq ko‘chadi
 * - Qidiruv markazda (3/5)
 * - Notch rangi: #3050F9 (brand accent)
 */
export function TabBar({ active, onChange }: TabBarProps) {
  // Tartib: Blog 2-o‘rinda, Qidiruv markazda, Buyurtmalar 4-o‘rinda
  const items: TabItem[] = useMemo(
    () => [
      { icon: HomeIcon, label: 'Bosh sahifa', value: 'home' },
      { icon: Newspaper, label: 'Blog', value: 'benefits' },
      { icon: Search, label: 'Qidiruv', value: 'search' }, // markaz
      { icon: Receipt, label: 'Buyurtmalar', value: 'orders' },
      { icon: User, label: 'Profil', value: 'profile' },
    ],
    [],
  )

  const count = items.length
  const activeIndex = Math.max(0, items.findIndex((t) => t.value === active))

  // Notch gorizontal markazi: (i + 0.5) * (100% / count)
  const leftPercent = ((activeIndex + 0.5) * 100) / count
  const ActiveIcon = items[activeIndex]?.icon ?? Search

  return (
    <div className="absolute left-0 right-0 bottom-0 z-10">
      {/* Panel: pastga yopishgan, full-width; faqat yuqori burchaklari yumaloq */}
      <div className="relative h-20 w-full rounded-t-2xl bg-slate-900 px-2 shadow-lg ring-1 ring-black/10">
        {/* Harakatlanuvchi notch: doira + oq halqa bilan vizual oyma */}
        <div
          style={{ left: `calc(${leftPercent}% )` }}
          className={[
            'pointer-events-none absolute top-0 -translate-x-1/2 -translate-y-1/2',
            'flex h-14 w-14 items-center justify-center rounded-full bg-[#3050F9] text-white',
            'ring-4 ring-white shadow-xl moving-bubble',
          ].join(' ')}
          aria-hidden
        >
          <ActiveIcon size={20} />
        </div>

        {/* 5 ustun: butun balandlik bo‘ylab joylashuv, label bilan */}
        <div className="grid h-full grid-cols-5">
          {items.map((t) => (
            <IconButton
              key={t.value}
              item={t}
              active={active === t.value}
              onClick={() => onChange(t.value)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
