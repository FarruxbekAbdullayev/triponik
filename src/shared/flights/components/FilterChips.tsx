/**
 * FilterChips.tsx
 * Qidiruv filtrlari chip paneli: bitta qatorda, gorizontal skroll, brand accent (#3050F9).
 */

import React from 'react'
import { Button } from '../../../components/ui/button'
import { Filter, ArrowRightLeft, RotateCcw, BaggageClaim } from 'lucide-react'

/** Filterlar holati */
export interface FiltersState {
  direct: boolean
  baggage: boolean
  refundable: boolean
}

/** Kontrast boshqaruvi uchun ohang */
export type ChipsTone = 'light' | 'dark'

/** FilterChips komponenti props */
export interface FilterChipsProps {
  value: FiltersState
  onChange: (next: FiltersState) => void
  /** Fon to‘q bo‘lsa 'dark' qilib yuboring (masalan, sarlavha panelida) */
  tone?: ChipsTone
}

/** Brand accent (arbitrary value orqali Tailwind) */
const BRAND = '#3050F9'

/**
 * FilterChips
 * - Bitta qatorda, gorizontal skroll (overflow-x-auto)
 * - Shadcn outline tugmalari (bg-transparent shart bajarilgan)
 * - Tone=dark/light bo‘yicha kontrast
 */
export function FilterChips({ value, onChange, tone = 'light' }: FilterChipsProps) {
  /** Belgini almashtirish */
  function toggle(key: keyof FiltersState) {
    onChange({ ...value, [key]: !value[key] })
  }

  /** Tone bo‘yicha button klasslari */
  function chipClass(active?: boolean) {
    const base =
      'bg-transparent h-8 px-3 text-xs whitespace-nowrap'
    const toneClass =
      tone === 'dark'
        ? 'text-white/90 border-white/30 hover:bg-white/10 hover:text-white'
        : 'text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
    const ring = active ? `ring-2 ring-[${BRAND}]/60` : ''
    return [base, toneClass, ring].join(' ')
  }

  return (
    <div className="no-scrollbar -mx-4 overflow-x-auto px-4" aria-label="Filtrlash chiplari">
      <div className="flex min-w-max items-center gap-2">
        <Button
          variant="outline"
          className={chipClass()}
          onClick={() => {
            // Bu yerda keyinchalik to‘liq filter dialogi ochilishi mumkin.
          }}
        >
          <Filter className="mr-1 h-4 w-4" />
          Filtrlar
        </Button>

        <Button
          variant="outline"
          className={chipClass(value.direct)}
          onClick={() => toggle('direct')}
        >
          <ArrowRightLeft className="mr-1 h-4 w-4 rotate-90" />
          To‘g‘ridan-to‘g‘ri
        </Button>

        <Button
          variant="outline"
          className={chipClass(value.baggage)}
          onClick={() => toggle('baggage')}
        >
          <BaggageClaim className="mr-1 h-4 w-4" />
          Bagaj bor
        </Button>

        <Button
          variant="outline"
          className={chipClass(value.refundable)}
          onClick={() => toggle('refundable')}
        >
          <RotateCcw className="mr-1 h-4 w-4" />
          Qaytarilishi mumkin
        </Button>
      </div>
    </div>
  )
}

export default FilterChips
