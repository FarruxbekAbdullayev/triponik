/**
 * SearchForm.tsx
 * Dinamik qidiruv formasi: chip (mode) ga qarab maydonlar o'zgaradi.
 * - Transport (plane/train/transfer/tour/carRent): from, to, date, pax.
 * - Hotel: city, checkIn, checkOut, guests.
 * Submit: agar onSearch berilgan bo'lsa shu chaqiriladi; aks holda mos sahifaga navigate.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import type { SearchMode } from './SearchTabs'

/** Transport rejimlari (mehmonxona bundan mustasno) */
export type TransportMode = 'plane' | 'train' | 'transfer' | 'tour' | 'carRent'

/** Transport qidiruvi qiymatlari */
export interface TransportFormValues {
  /** Discriminator: chip turi */
  mode: TransportMode
  /** Qayerdan */
  from: string
  /** Qayerga */
  to: string
  /** Sana (YYYY-MM-DD) */
  date: string
  /** Yo'lovchilar soni */
  pax: number
}

/** Mehmonxona qidiruvi qiymatlari */
export interface HotelFormValues {
  /** Discriminator: 'hotel' */
  mode: 'hotel'
  /** Shahar nomi */
  city: string
  /** Check-in sanasi (YYYY-MM-DD) */
  checkIn: string
  /** Check-out sanasi (YYYY-MM-DD) */
  checkOut: string
  /** Mehmonlar soni */
  guests: number
}

/** Barcha qidiruv qiymatlari uchun birlashma */
export type SearchFormValues = TransportFormValues | HotelFormValues

/** Komponent propslari */
export interface SearchFormProps {
  /** Faol chip turi */
  mode: SearchMode
  /** Submit bo‘lganda chaqiriladi; agar berilsa routerga o‘tmaymiz */
  onSearch?: (values: SearchFormValues) => void
}

/** Berilgan mode uchun boshlang'ich qiymatlar */
function initialValuesByMode(mode: SearchMode): SearchFormValues {
  if (mode === 'hotel') {
    return {
      mode: 'hotel',
      city: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
    }
  }
  return {
    mode: (mode as TransportMode) ?? 'plane',
    from: '',
    to: '',
    date: '',
    pax: 1,
  }
}

/**
 * SearchForm
 * - UI: oq karta, soddalashtirilgan inputlar, fokusda ko'k ring
 * - Dinamika: mode='hotel' bo'lsa mehmonxona uchun maxsus maydonlar
 * - Submit: onSearch bo'lsa shu; aks holda props.mode asosida mos sahifaga navigate
 */
export default function SearchForm(props: SearchFormProps) {
  const nav = useNavigate()

  // Ichki holat: mode bo'yicha qiymatlar
  const [values, setValues] = useState<SearchFormValues>(() =>
    initialValuesByMode(props.mode)
  )

  // Mode o'zgarsa formani reset qilamiz
  useEffect(() => {
    setValues(initialValuesByMode(props.mode))
  }, [props.mode])

  /** Maydon qiymatini yangilash */
  function update<K extends keyof SearchFormValues>(
    key: K,
    val: SearchFormValues[K]
  ) {
    setValues((v) => ({ ...v, [key]: val }))
  }

  /**
   * Submit: callback yoki marshrut
   * Muhim: marshrutni props.mode bo'yicha tanlaymiz (eng ishonchli manba).
   */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (props.onSearch) {
      props.onSearch(values)
      return
    }
    const mode = props.mode
    if (mode === 'hotel') {
      nav('/hotels')
    } else if (mode === 'carRent') {
      nav('/car-rent')
    } else {
      nav('/flights')
    }
  }

  // Tugma matni: props.mode bo'yicha
  const submitLabel = useMemo(() => {
    if (props.mode === 'hotel') return 'Mehmonxonalarni qidirish'
    if (props.mode === 'carRent') return 'Avto ijaralarni qidirish'
    if (props.mode === 'transfer') return 'Transferni qidirish'
    if (props.mode === 'tour') return 'Turlarni qidirish'
    return 'Biletlarni qidirish'
  }, [props.mode])

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        {props.mode === 'hotel' ? (
          /* Mehmonxona uchun forma */
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Shahar"
              aria-label="Shahar"
              value={(values as any).city}
              onChange={(e) =>
                update('city', (e.target.value || '') as SearchFormValues['city'])
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />

            {/* Sanalar: check-in / check-out */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="date"
                placeholder="Check-in"
                aria-label="Check-in"
                value={(values as any).checkIn}
                onChange={(e) =>
                  update('checkIn', (e.target.value || '') as SearchFormValues['checkIn'])
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
              />
              <input
                type="date"
                placeholder="Check-out"
                aria-label="Check-out"
                value={(values as any).checkOut}
                onChange={(e) =>
                  update('checkOut', (e.target.value || '') as SearchFormValues['checkOut'])
                }
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
              />
            </div>

            <input
              type="number"
              min={1}
              placeholder="Mehmonlar"
              aria-label="Mehmonlar"
              value={(values as any).guests}
              onChange={(e) =>
                update(
                  'guests',
                  Number(e.target.value || 1) as SearchFormValues['guests']
                )
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />

            <button
              type="submit"
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#3050F9] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
            >
              {submitLabel}
            </button>
          </div>
        ) : (
          /* Transport uchun forma (shu jumladan carRent) */
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Qayerdan"
              aria-label="Qayerdan"
              value={(values as any).from}
              onChange={(e) =>
                update('from', (e.target.value || '') as SearchFormValues['from'])
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />
            <input
              type="text"
              placeholder="Qayerga"
              aria-label="Qayerga"
              value={(values as any).to}
              onChange={(e) =>
                update('to', (e.target.value || '') as SearchFormValues['to'])
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />
            <input
              type="date"
              placeholder="Qachon"
              aria-label="Qachon"
              value={(values as any).date}
              onChange={(e) =>
                update('date', (e.target.value || '') as SearchFormValues['date'])
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />
            <input
              type="number"
              min={1}
              placeholder="Yo‘lovchilar"
              aria-label="Yo‘lovchilar"
              value={(values as any).pax}
              onChange={(e) =>
                update('pax', Number(e.target.value || 1) as SearchFormValues['pax'])
              }
              className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#3050F9] focus:ring-2 focus:ring-[#3050F9]/30"
            />
            <button
              type="submit"
              className="mt-2 inline-flex h-12 w-full items-center justify-center rounded-xl bg-[#3050F9] px-4 text-sm font-semibold text-white shadow-sm transition hover:brightness-95 active:brightness-90"
            >
              {submitLabel}
            </button>
          </div>
        )}
      </div>
    </form>
  )
}
