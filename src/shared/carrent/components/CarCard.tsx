/**
 * CarCard.tsx
 * Avto ijara varianti kartasi — badge'lar, nom, toifa, xususiyatlar, provayderlar va narx (so'm).
 */

import React from 'react'
import type { CarOption } from '../types'
import { Users, Luggage, DoorClosed, Gauge, BusFront } from 'lucide-react'

/** Prop turlari */
export interface CarCardProps {
  /** Ko'rsatiladigan avto ijara varianti */
  car: CarOption
}

/** so'm format (UZ) */
function formatSum(n: number) {
  try {
    return new Intl.NumberFormat('uz-UZ').format(n) + " so‘m"
  } catch {
    return `${n.toLocaleString()} so‘m`
  }
}

/**
 * CarCard
 * - Yuqorida badge'lar
 * - O'rtada: chapda matnlar, o'ngda rasm
 * - Pastda: provayder chiplar va narxlar
 */
export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      {/* Badge'lar */}
      {(car.badges && car.badges.length > 0) && (
        <div className="mb-2 flex flex-wrap gap-2">
          {car.badges?.map((b, i) => (
            <span
              key={i}
              className={[
                'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold',
                b.toLowerCase().includes('top') ? 'bg-emerald-100 text-emerald-700' : 'bg-sky-100 text-sky-700',
              ].join(' ')}
            >
              {b}
            </span>
          ))}
        </div>
      )}

      {/* Asosiy qator: matn va rasm */}
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="text-[15px] font-semibold text-slate-900">{car.name}</h3>
          <div className="text-sm text-slate-600">yoki shunga o‘xshash {car.category.toLowerCase()}</div>

          {/* Xususiyatlar */}
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-700">
            <Spec icon={<Users className="h-4 w-4" />} label={`${car.seats}`} />
            <Spec icon={<Luggage className="h-4 w-4" />} label={`${car.bags}`} />
            <Spec icon={<DoorClosed className="h-4 w-4" />} label={`${car.doors}`} />
            <Spec icon={<Gauge className="h-4 w-4" />} label={car.automatic ? 'Avtomat' : 'Mexanik'} />
            {car.shuttle && <Spec icon={<BusFront className="h-4 w-4" />} label="Shuttle bus" />}
          </div>
        </div>

        {/* Rasm */}
        <div className="relative h-20 w-32 shrink-0">
          <img
            src={car.imageUrl || 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/2c639568-dc6c-474a-9f4b-56d036620ae3.jpg'}
            alt={car.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Provayderlar */}
      {car.providers && car.providers.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {car.providers.map((p, i) => (
            <span key={i} className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Narxlar */}
      <div className="mt-3 flex items-baseline justify-between">
        <div className="text-slate-600">
          <span className="text-slate-500">dan </span>
          <span className="text-lg font-bold text-slate-900">{formatSum(car.pricePerDaySum)}</span>
          <span className="text-slate-500">/kun</span>
        </div>
        <div className="text-sm text-slate-600">
          <span className="text-slate-500">Jami: </span>
          <span className="font-semibold text-slate-900">{formatSum(car.totalSum)}</span>
        </div>
      </div>
    </div>
  )
}

/** Kichik xususiyat elementi (ikonka + matn) */
function Spec({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      {icon}
      <span>{label}</span>
    </span>
  )
}
