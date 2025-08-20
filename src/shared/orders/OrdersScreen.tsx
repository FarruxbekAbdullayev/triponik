/** 
 * OrdersScreen.tsx
 * Buyurtmalar sahifasi: light tema, transport turi bo'yicha filter.
 * Hotel uchun 2-ustunli grid va skelet yuklash animatsiyasi qo'shildi.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { OrdersFilter } from './components/OrdersFilter'
import { OrderCard } from './components/OrderCard'
import OrderCardSkeleton from './components/OrderCardSkeleton'

/** Transport turi (yangilangan) */
export type TransportKind = 'plane' | 'train' | 'hotel' | 'transfer' | 'tour'

/** Bitta buyurtma yozuvi */
export interface OrderItem {
  /** Unikal ID */
  id: string
  /** Transport yoki xizmat turi */
  kind: TransportKind
  /** Yo'nalish: qayerdan -> qayerga (hotel/transfer/tur uchun ham matn sifatida) */
  route: { from: string; to: string }
  /** Sana (ko'rsatiladigan) */
  date: string
  /** Vaqt (ko'rsatiladigan) */
  time: string
  /** Davomiylik (ko'rsatiladigan) */
  duration?: string
  /** To'g'ridan-to'g'ri yoki yo'q (aviapo'ezdlar uchun) */
  direct?: boolean
  /** Holat (matn) */
  status: 'To‘landi' | 'Kutilmoqda' | 'Bekor qilingan'
  /** Narx (matn) */
  price: string
  /** Qo'shimcha izoh (ixtiyoriy) */
  note?: string
  /** Kichik rasm (faqat mehmonxona uchun majburiy), smart placeholder */
  image?: string
}

/**
 * Demo ma'lumotlar.
 */
const ORDERS: OrderItem[] = [
  // Tashkent — Samarqand
  {
    id: 'ts_avi_1',
    kind: 'plane',
    route: { from: 'Toshkent', to: 'Samarqand' },
    date: '31 avg, shan',
    time: '09:00',
    duration: '1 soat 25 daqiqa',
    direct: true,
    status: 'To‘landi',
    price: '477 900 so‘m',
    note: 'Qo‘shimcha bagaj yo‘q',
  },
  {
    id: 'ts_train_1',
    kind: 'train',
    route: { from: 'Toshkent', to: 'Samarqand' },
    date: '31 avg, shan',
    time: '16:10',
    duration: '2 soat 10 daqiqa',
    direct: true,
    status: 'Kutilmoqda',
    price: '189 000 so‘m',
    note: 'Afrasiyob, 12-vagon',
  },

  // Tashkent — Buxoro
  {
    id: 'tb_avi_1',
    kind: 'plane',
    route: { from: 'Toshkent', to: 'Buxoro' },
    date: '2 sen, dush',
    time: '08:20',
    duration: '1 soat 15 daqiqa',
    direct: true,
    status: 'To‘landi',
    price: '528 000 so‘m',
    note: 'Qaytarib bo‘lmaydi',
  },
  {
    id: 'tb_train_1',
    kind: 'train',
    route: { from: 'Toshkent', to: 'Buxoro' },
    date: '2 sen, dush',
    time: '07:30',
    duration: '6 soat 15 daqiqa',
    direct: true,
    status: 'To‘landi',
    price: '299 000 so‘m',
    note: 'Platskart, 22-joy',
  },

  // Samarqand — Registon Plaza (Mehmonxona) – 2 ta
  {
    id: 'sm_hotel_1',
    kind: 'hotel',
    route: { from: 'Samarqand', to: 'Registon Plaza' },
    date: '12 sen, paysh',
    time: 'Kirish: 14:00',
    duration: '2 kecha',
    status: 'To‘landi',
    price: '1 280 000 so‘m',
    note: 'Standart xona, nonushta kiritilgan',
    image: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/7f0e71b7-ffad-498a-89bd-996fd6a93c10.jpg',
  },
  {
    id: 'sm_hotel_2',
    kind: 'hotel',
    route: { from: 'Samarqand', to: 'Registon Plaza' },
    date: '20 sen, juma',
    time: 'Kirish: 15:00',
    duration: '3 kecha',
    status: 'Kutilmoqda',
    price: '1 890 000 so‘m',
    note: 'Deluxe xona, bepul bekor qilish',
    image: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/4cadd40e-3853-432a-8700-3f931fa03f3e.jpg',
  },

  // Toshkent Aeroport — Hilton (Transfer) – 2 ta
  {
    id: 'tk_transfer_1',
    kind: 'transfer',
    route: { from: 'Toshkent Aeroport', to: 'Hilton Tashkent City' },
    date: '14 sen, yak',
    time: '23:20',
    duration: '40 daqiqa',
    direct: true,
    status: 'To‘landi',
    price: '90 000 so‘m',
    note: 'Sedan, haydovchi kutib oladi',
  },
  {
    id: 'tk_transfer_2',
    kind: 'transfer',
    route: { from: 'Toshkent Aeroport', to: 'Hilton Tashkent City' },
    date: '16 sen, sesh',
    time: '07:10',
    duration: '35 daqiqa',
    direct: true,
    status: 'Kutilmoqda',
    price: '85 000 so‘m',
    note: 'Komfort klass, 2 ta bagaj',
  },

  // Buxoro — Shahar sayohati (Tur) – 2 ta
  {
    id: 'bx_tour_1',
    kind: 'tour',
    route: { from: 'Buxoro', to: 'Shahar sayohati' },
    date: '18 sen, chorsh',
    time: '10:00',
    duration: '5 soat',
    status: 'To‘landi',
    price: '250 000 so‘m',
    note: 'Gid xizmatlari kiritilgan',
  },
  {
    id: 'bx_tour_2',
    kind: 'tour',
    route: { from: 'Buxoro', to: 'Shahar sayohati' },
    date: '22 sen, yak',
    time: '12:00',
    duration: '5 soat',
    status: 'Kutilmoqda',
    price: '230 000 so‘m',
    note: 'Guruxli tur, kirish chiptalari alohida',
  },
]

/**
 * OrdersScreen
 * Light tema: sarlavha va ro'yxat oq fon ichida.
 * - Filtr: faqat transport turi (plane/train/hotel/transfer/tour)
 * - Ro'yxat: filtrga mos buyurtmalar
 * - Hotel rejimida (filter=hotel) 2-ustunli grid
 * - Dastlab skelet yuklash animatsiyasi (700ms)
 * - Yuqori qismi tekis (rounded yo'q)
 */
export function OrdersScreen() {
  // Transport filtri
  const [transport, setTransport] = useState<'all' | TransportKind>('all')
  // Skelet yuklash holati
  const [loading, setLoading] = useState(true)

  /** Demo: qisqa skeleton faza */
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  /** Filtrlab olingan ro'yxat (faqat transport turi) */
  const filtered = useMemo(() => {
    return ORDERS.filter((o) => {
      return transport === 'all' ? true : o.kind === transport
    })
  }, [transport])

  /** Hotel grid rejimi */
  const isHotelMode = transport === 'hotel'

  /** Grid sinflari: hotel uchun 2 ustun, boshqasida 1 ustun */
  const gridClasses = isHotelMode
    ? 'grid grid-cols-2 gap-3 px-4 pb-4'
    : 'grid grid-cols-1 gap-3 px-4 pb-4'

  /** Skeleton elementlar soni */
  const skeletonCount = isHotelMode ? 6 : 4

  return (
    <div className="page-enter">
      {/* Oq sirt: sarlavha + filtr + ro‘yxat (light) */}
      <div className="flex-1 overflow-y-auto pb-20">
        {/* Yuqori qismi tekis bo‘lishi uchun rounded yo‘q */}
        <div className="bg-white">
          {/* Sarlavha (light) */}
          <div className="px-4 pt-4">
            <div className="text-2xl font-bold tracking-tight text-slate-900">Buyurtmalar</div>
            <div className="mt-1 text-xs text-slate-500">Oxirgi 30 kun ichidagi harakatlar</div>
          </div>

          {/* Filtr paneli (sticky) */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-white to-white/90 px-4 pt-3 backdrop-blur">
            <OrdersFilter transport={transport} onTransportChange={setTransport} />
          </div>

          {/* Ro'yxat yoki skelet */}
          <div className={gridClasses}>
            {loading &&
              Array.from({ length: skeletonCount }).map((_, i) => (
                <OrderCardSkeleton key={`sk_${i}`} variant={isHotelMode ? 'hotel' : 'default'} />
              ))}

            {!loading &&
              filtered.map((o) => <OrderCard key={o.id} item={o} />)}

            {!loading && filtered.length === 0 && (
              <div className="col-span-full mt-6 rounded-2xl bg-slate-50 p-4 text-center text-sm text-slate-500 ring-1 ring-slate-100">
                Mos buyurtmalar topilmadi. Filtrlarni almashtirib ko‘ring.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
