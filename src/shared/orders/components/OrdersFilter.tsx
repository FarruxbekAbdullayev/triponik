/**
 * OrdersFilter.tsx
 * Transport turi bo'yicha filtrlash uchun chip tugmalar qatori (light).
 * Turlar: plane, train, hotel, transfer, tour.
 */

import React from 'react'
import type { TransportKind } from '../OrdersScreen'
import { Plane, TrainFront, Bed, Car, Map } from 'lucide-react'

/** Props for OrdersFilter */
interface OrdersFilterProps {
  /** Transport filtri qiymati */
  transport: 'all' | TransportKind
  /** O'zgarish hodisasi */
  onTransportChange: (v: 'all' | TransportKind) => void
}

/**
 * ChipButton
 * Yengil konturli/aktiv holatli kichik chip tugma.
 */
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
        active ? 'bg-[#3050F9] text-white ring-[#3050F9]' : 'bg-white text-slate-700 ring-slate-200 hover:bg-slate-50',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/**
 * OrdersFilter
 * Faqat transport turi chiplari (yo'nalishlar qatori olib tashlandi).
 */
export function OrdersFilter({ transport, onTransportChange }: OrdersFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      <ChipButton active={transport === 'all'} onClick={() => onTransportChange('all')}>
        Barchasi
      </ChipButton>
      <ChipButton active={transport === 'plane'} onClick={() => onTransportChange('plane')}>
        <span className="inline-flex items-center gap-1">
          <Plane size={14} /> Samolyot
        </span>
      </ChipButton>
      <ChipButton active={transport === 'train'} onClick={() => onTransportChange('train')}>
        <span className="inline-flex items-center gap-1">
          <TrainFront size={14} /> Poyezd
        </span>
      </ChipButton>
      <ChipButton active={transport === 'hotel'} onClick={() => onTransportChange('hotel')}>
        <span className="inline-flex items-center gap-1">
          <Bed size={14} /> Mehmonxona
        </span>
      </ChipButton>
      <ChipButton active={transport === 'transfer'} onClick={() => onTransportChange('transfer')}>
        <span className="inline-flex items-center gap-1">
          <Car size={14} /> Transfer
        </span>
      </ChipButton>
      <ChipButton active={transport === 'tour'} onClick={() => onTransportChange('tour')}>
        <span className="inline-flex items-center gap-1">
          <Map size={14} /> Tur
        </span>
      </ChipButton>
    </div>
  )
}
