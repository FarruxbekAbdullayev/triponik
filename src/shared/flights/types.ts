/**
 * types.ts
 * Parvoz qidiruv natijalari uchun tiplar.
 */

export interface FlightOffer {
  /** Unikal ID */
  id: string
  /** Avia kompaniya nomi */
  airline: string
  /** Reyting (0-10) badge ko‘rsatish uchun */
  rating: number
  /** Jo‘nab-ketish va yetib borish vaqtlari (HH:MM) */
  departTime: string
  arriveTime: string
  /** Yo‘l vaqti (masalan: "4 ч 25 м в пути") */
  duration: string
  /** Jo‘nab-ketish va yetib borish aeroportlari */
  fromAirport: string
  toAirport: string
  /** Sana matni (quyi meta satrlar uchun) */
  dateLabel: string
  /** Yo‘nalish shaharlari (quyi meta satrlar uchun) */
  fromCity: string
  toCity: string
  /** To‘g‘ridan-to‘g‘ri reysmi */
  direct: boolean
  /** Chipta narxi (RUB) */
  priceRub: number
  /** Qo‘shimcha bagaj narxi (RUB) */
  baggagePriceRub?: number
  /** "Eng arzon" badge ko‘rsatish uchun */
  cheapest?: boolean
}

export interface DayTab {
  /** Sana yorlig‘i (masalan: "14 aug, thu") */
  label: string
  /** Kichik narx badge (RUB) yoki undefined */
  priceRub?: number
}