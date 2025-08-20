/**
 * SearchTabs.tsx
 * Qidiruv sahifasi turlari uchun chip tablar va ularga mos dinamik SearchForm.
 * Accent rang: #3050F9
 * Navigatsiya qoidasi:
 * - Agar props.onSearch mavjud bo'lsa: faqat shu callback chaqiriladi (ota overlay ochadi).
 * - Aks holda: tanlangan rejimga mos routerga navigatsiya qilinadi.
 */

import React, { useState } from 'react'
import { Plane, TrainFront, Bed, Car, Map, CarFront } from 'lucide-react'
import SearchForm, { type SearchFormValues } from './SearchForm'
import { useNavigate } from 'react-router'

/** Qidiruv rejimlari (turlari) */
export type SearchMode = 'plane' | 'train' | 'hotel' | 'transfer' | 'tour' | 'carRent'

/** SearchTabs props: submit bo'lganda ota-komponentni xabardor qilish */
export interface SearchTabsProps {
  /** Submit bo‘lganda qidiruv qiymatlari bilan chaqiriladi */
  onSearch?: (values: SearchFormValues) => void
}

/** ChipButton: aktiv/oddiy holatdagi chip tugma */
function ChipButton({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'whitespace-nowrap rounded-full px-3 py-1.5 text-xs ring-1 transition',
        active
          ? 'bg-[#3050F9] text-white ring-[#3050F9]'
          : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/**
 * SearchTabs
 * - Yuqorida chip tablar (gorizontal skroll)
 * - Pastda tanlangan turga mos SearchForm (dinamik)
 * - Barchasi light fonda, tagiga TabBar uchun bo‘sh joy qoldiriladi
 * - Navigatsiya: agar onSearch bo'lmasa—router; bo'lsa—ota overlay.
 */
export function SearchTabs(props: SearchTabsProps) {
  const [mode, setMode] = useState<SearchMode>('plane')
  const nav = useNavigate()

  /**
   * handleSearch
   * - SearchForm'dan kelgan submit callback
   * - onSearch berilgan bo‘lsa: faqat chaqiramiz va return (ota overlay ochadi)
   * - Aks holda: tanlangan rejimga mos marshrutga navigatsiya
   */
  function handleSearch(values: SearchFormValues) {
    if (props.onSearch) {
      props.onSearch(values)
      return
    }
    const m = mode
    if (m === 'hotel') {
      nav('/hotels')
    } else if (m === 'carRent') {
      nav('/car-rent')
    } else {
      nav('/flights')
    }
  }

  return (
    <div className="px-4">
      {/* Sarlavha */}
      <div className="pt-4">
        <div className="text-2xl font-bold tracking-tight text-slate-900">Qidiruv</div>
        <div className="mt-1 text-xs text-slate-500">Yo‘l va tur xizmatlarini qidiring</div>
      </div>

      {/* Chip tablar */}
      <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/90 pt-3 backdrop-blur">
        <div className="flex gap-2 overflow-x-auto pb-1">
          <ChipButton active={mode === 'plane'} onClick={() => setMode('plane')}>
            <span className="inline-flex items-center gap-1">
              <Plane size={14} /> Samolyot
            </span>
          </ChipButton>
          <ChipButton active={mode === 'train'} onClick={() => setMode('train')}>
            <span className="inline-flex items-center gap-1">
              <TrainFront size={14} /> Poyezd
            </span>
          </ChipButton>
          <ChipButton active={mode === 'hotel'} onClick={() => setMode('hotel')}>
            <span className="inline-flex items-center gap-1">
              <Bed size={14} /> Mehmonxona
            </span>
          </ChipButton>
          <ChipButton active={mode === 'transfer'} onClick={() => setMode('transfer')}>
            <span className="inline-flex items-center gap-1">
              <Car size={14} /> Transfer
            </span>
          </ChipButton>
          <ChipButton active={mode === 'tour'} onClick={() => setMode('tour')}>
            <span className="inline-flex items-center gap-1">
              <Map size={14} /> Tur
            </span>
          </ChipButton>
          <ChipButton active={mode === 'carRent'} onClick={() => setMode('carRent')}>
            <span className="inline-flex items-center gap-1">
              <CarFront size={14} /> Car Rent
            </span>
          </ChipButton>
        </div>
      </div>

      {/* Forma: tanlangan rejimga mos */}
      <div className="mt-3">
        <SearchForm mode={mode} onSearch={handleSearch} />
      </div>

      {/* Pastga bo‘sh joy: TabBar (h-20) bilan to‘qnashmaslik uchun */}
      <div className="pointer-events-none h-24" aria-hidden />
    </div>
  )
}
