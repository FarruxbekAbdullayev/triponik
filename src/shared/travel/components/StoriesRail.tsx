/**
 * StoriesRail.tsx
 * Light tema uchun “stories” lentalari: portret (vertikal) kartalar, gorizontal scroll, scrollbar ko‘rinmaydi.
 * Ba’zi elementlar “new” (ochilmagan) holatda dashed stroke bilan ajratiladi.
 */

import React from 'react'

/** Story holati */
export type StoryStatus = 'new' | 'seen'

/** Bitta story elementi uchun interfeys */
export interface StoryItem {
  /** Unikal id */
  id: string
  /** Ko‘rinadigan nom (label) */
  title: string
  /** Rasm manbai (smart placeholder yoki real URL) */
  src: string
  /** Holat: new — ochilmagan (dashed), seen — ko‘rilgan (oddiy) */
  status?: StoryStatus
}

/** StoriesRail propslari */
export interface StoriesRailProps {
  /** Story elementlari; berilmasa, default namunalardan foydalaniladi */
  items?: StoryItem[]
  /** Story tugmasi bosilganda chaqiriladigan handler */
  onStoryClick?: (item: StoryItem) => void
  /** Ixtiyoriy className — tashqi konteyner ishlatmasdan spacing berish uchun */
  className?: string
}

/** Default stories (namuna) — status aralash holda */
const DEFAULT_STORIES: StoryItem[] = [
  {
    id: 's1',
    title: 'Toshkent',
    src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/a74aeea3-65e2-4656-a24c-414b634c597b.jpg',
    status: 'new',
  },
  {
    id: 's2',
    title: 'Buxoro',
    src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/8f84da24-100e-4d1d-ab4a-aba7554b67fa.jpg',
    status: 'seen',
  },
  {
    id: 's3',
    title: 'Samarqand',
    src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/1035d3f9-da8f-4f38-b606-dd99877fe65b.jpg',
    status: 'new',
  },
  {
    id: 's4',
    title: 'Xiva',
    src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/f4c7087a-9f8c-49ea-938d-d1e1f265a86c.jpg',
    status: 'seen',
  },
  {
    id: 's5',
    title: 'Chorvoq',
    src: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/152963fa-d3bb-4213-937c-108a7dc28b04.jpg',
    status: 'new',
  },
]

/**
 * StoryCard
 * Portret (vertikal) story kartasi: “new” bo‘lsa dashed border, aks holda yengil ring.
 * Ichida rasm, pastdan gradient va sarlavha joylashadi.
 */
function StoryCard({
  item,
  onClick,
}: {
  item: StoryItem
  onClick?: (item: StoryItem) => void
}) {
  const isNew = (item.status ?? 'seen') === 'new'

  // Tashqi ramka (dashed/solid) uchun klasslar
  const frameClass = isNew
    ? [
        'border-2 border-dashed border-[#3050F9]',
        'shadow-[0_1px_0_rgba(48,80,249,0.06)]',
      ].join(' ')
    : [
        'ring-1 ring-slate-200',
        'shadow-[0_1px_0_rgba(15,23,42,0.03)]',
      ].join(' ')

  return (
    <button
      type="button"
      onClick={() => onClick?.(item)}
      aria-label={item.title}
      className="relative w-[108px] shrink-0 text-left focus:outline-none"
    >
      {/* Tashqi ramka: dashed (new) yoki ring (seen) */}
      <div className={['rounded-2xl p-[3px] transition', frameClass].join(' ')}>
        {/* Ichki rasm konteyneri */}
        <div className="relative h-[168px] w-full overflow-hidden rounded-xl bg-slate-100">
          <img src={item.src} className="object-cover h-full w-full" />
          {/* Pastdan yengil gradient — matn o‘qilishi uchun */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent" />
          <div className="pointer-events-none absolute inset-x-2 bottom-2 truncate text-xs font-medium text-white drop-shadow">
            {item.title}
          </div>
        </div>
      </div>
    </button>
  )
}

/**
 * StoriesRail
 * Gorizontal scroll qilinadigan qator (scrollbar yashirilgan).
 * Hech qanday tashqi o‘rab turuvchi konteyner ishlatilmaydi — ro‘yxatning o‘zi root sifatida chiqadi.
 */
export function StoriesRail({ items, onStoryClick, className }: StoriesRailProps) {
  const data = items && items.length ? items : DEFAULT_STORIES

  // Scrollbarni barcha asosiy dvigatellarda yashirish uchun xos klasslar
  const rootClasses = [
    'flex gap-3 overflow-x-auto pb-1',
    // Firefox
    "[scrollbar-width:'none']",
    // IE/Edge eski
    "[-ms-overflow-style:'none']",
    // WebKit (Chrome/Safari/Edge Chromium)
    '[&::-webkit-scrollbar]:hidden',
    className ?? '',
  ].join(' ')

  return (
    <div className={rootClasses} role="list" aria-label="Stories">
      {data.map((it) => (
        <StoryCard key={it.id} item={it} onClick={onStoryClick} />
      ))}
    </div>
  )
}
