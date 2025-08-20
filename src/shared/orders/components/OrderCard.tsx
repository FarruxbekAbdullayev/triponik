/**
 * OrderCard.tsx
 * Buyurtma kartasi: hotel uchun vertikal (grid 2-ustun) layout, boshqa turlar klassik.
 * Hotel holatida status belgisi rasm usti (top-left) overlay sifatida ko‘rsatiladi.
 * "Tafsilot" tugmasi yo‘q.
 */

import React from 'react'
import { Plane, TrainFront, Bed, Car, Map, Calendar } from 'lucide-react'
import type { OrderItem } from '../OrdersScreen'

/** Rang sxemalari transport turiga ko'ra */
const kindStyles: Record<
  OrderItem['kind'],
  { pill: string; text: string }
> = {
  plane: { pill: 'bg-[#3050F9]/10 text-[#3050F9] ring-[#3050F9]/20', text: 'text-[#3050F9]' },
  train: { pill: 'bg-emerald-500/10 text-emerald-600 ring-emerald-600/20', text: 'text-emerald-600' },
  hotel: { pill: 'bg-violet-500/10 text-violet-600 ring-violet-600/20', text: 'text-violet-600' },
  transfer: { pill: 'bg-sky-500/10 text-sky-600 ring-sky-600/20', text: 'text-sky-600' },
  tour: { pill: 'bg-rose-500/10 text-rose-600 ring-rose-600/20', text: 'text-rose-600' },
}

/** Holat belgisi ranglari */
const statusStyles: Record<OrderItem['status'], string> = {
  'To‘landi': 'bg-emerald-50 text-emerald-700 ring-emerald-600/20',
  Kutilmoqda: 'bg-amber-50 text-amber-700 ring-amber-600/20',
  'Bekor qilingan': 'bg-rose-50 text-rose-700 ring-rose-600/20',
}

/**
 * IconByKind
 * Turga mos ikonani beradi (hotel branchida ishlatilmaydi).
 */
function IconByKind({ kind }: { kind: OrderItem['kind'] }) {
  if (kind === 'plane') return <Plane size={16} />
  if (kind === 'train') return <TrainFront size={16} />
  if (kind === 'hotel') return <Bed size={16} />
  if (kind === 'transfer') return <Car size={16} />
  return <Map size={16} />
}

/**
 * OrderCard
 * - Hotel: vertikal karta (rasm yuqorida 4:3), status rasm ustida (top-left), pastda matn + narx + meta.
 * - Boshqa turlar: chapda pill-ikona, o‘ngda status + narx (+ ixtiyoriy kichik rasm), pastda meta.
 */
export function OrderCard({ item }: { item: OrderItem }) {
  const k = kindStyles[item.kind]
  /** Hotel uchun rasm (fallback mavjud) */
  const hotelImageSrc =
    item.image ||
    'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/9609ce19-b248-44db-a57f-c41c72d1d191.jpg'

  /**
   * MetaRow
   * Sana/vaqt/davomiylik/to‘g‘ridan-to‘g‘ri belgilarini bitta satrda ko‘rsatadi.
   */
  function MetaRow() {
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
        <Calendar size={14} />
        <span>
          {item.date}, {item.time}
          {item.duration ? ` · ${item.duration}` : ''}
          {item.direct ? ' · to‘g‘ridan-to‘g‘ri' : ''}
        </span>
      </div>
    )
  }

  // Hotel: vertikal karta, ikki ustunli gridga mos
  if (item.kind === 'hotel') {
    return (
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        {/* Rasm 4:3 (pb-[66%]) + status badge overlay (chap-ustki) */}
        <div className="relative w-full">
          <div className="relative w-full pb-[66%]">
            <img src={hotelImageSrc} className="absolute inset-0 h-full w-full object-cover" />
            {/* Status overlay: rasm ustida ko‘rinadi */}
            <span
              className={[
                'absolute left-2 top-2 inline-flex items-center rounded-md px-2 py-1 text-[10px] font-medium ring-1 shadow-sm',
                statusStyles[item.status],
              ].join(' ')}
            >
              {item.status}
            </span>
          </div>
        </div>

        {/* Ma'lumotlar qismi */}
        <div className="p-3">
          <div className="truncate text-sm font-semibold text-slate-900">
            {item.route.to}
          </div>
          <div className="truncate text-xs text-slate-500">{item.route.from}</div>
          {item.note && (
            <div className="mt-1 text-xs text-slate-600">
              {item.note}
            </div>
          )}

          {/* Narx (status badge endi rasm ustida) */}
          <div className="mt-2 flex items-center justify-start">
            <div className="text-base font-bold text-slate-900">{item.price}</div>
          </div>

          {/* Meta */}
          <MetaRow />
        </div>
      </div>
    )
  }

  // Boshqa turlar: klassik layout
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
      {/* Yuqori qator */}
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <span className={['flex h-8 w-8 items-center justify-center rounded-lg ring-1', k.pill].join(' ')}>
            <IconByKind kind={item.kind} />
          </span>

          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-slate-900">
              {item.route.from} — {item.route.to}
            </div>
            {item.note && <div className="truncate text-xs text-slate-500">{item.note}</div>}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {item.image && (
            <div className="h-10 w-14 overflow-hidden rounded-md ring-1 ring-slate-200">
              <img src={item.image} className="h-full w-full object-cover" />
            </div>
          )}
          <span
            className={[
              'inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-medium ring-1',
              statusStyles[item.status],
            ].join(' ')}
          >
            {item.status}
          </span>
          <div className="text-sm font-semibold text-slate-900">{item.price}</div>
        </div>
      </div>

      {/* Meta */}
      <MetaRow />
    </div>
  )
}
