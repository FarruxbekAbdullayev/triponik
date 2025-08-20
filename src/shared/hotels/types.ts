/**
 * types.ts
 * Mehmonxona bilan bog'liq turlar va demo ma'lumotlar (UZ so'm formatida).
 */

export interface Hotel {
  /** Mehmonxona identifikatori */
  id: string
  /** Mehmonxona nomi */
  name: string
  /** Shahar markazidan masofa (km) */
  distanceKm?: number
  /** Ko'rsatish uchun rasm URL */
  imageUrl?: string
  /** Reyting (0-10) */
  rating?: number
  /** Eski narx (so'm) */
  oldPriceSum?: number
  /** Amaldagi narx (so'm) */
  priceSum: number
  /** Tunlar soni */
  nights: number
  /** Mehmonlar soni */
  guests: number
  /** Qo'shimcha badge/chiplar (UZ) */
  badges?: string[]
}

/**
 * Demo ma'lumotlar — Istanbul ro'yxati (so'mda).
 * Badge'larda "GURU" va shu kabilar yo'q.
 */
export const demoHotels: Hotel[] = [
  {
    id: 'waves-hotel',
    name: 'Airport Waves Boutique-hotel',
    distanceKm: 27.9,
    imageUrl: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/92c5efdc-a8c5-41f9-96b8-fe5fd581a288.jpg',
    rating: 10,
    oldPriceSum: 3794000,
    priceSum: 3416000,
    nights: 1,
    guests: 2,
    badges: ['-10%'],
  },
  {
    id: 'golden-horn',
    name: 'Golden Horn Design Hotel',
    distanceKm: 1.2,
    imageUrl: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/6f0015a5-2cfc-4ad4-936b-9db5fa251cb5.jpg',
    rating: 9.3,
    oldPriceSum: 5200000,
    priceSum: 4680000,
    nights: 1,
    guests: 2,
    badges: ['Nonushta', 'Bekor qilish bepul'],
  },
  {
    id: 'beyoglu-suites',
    name: 'Beyoğlu City Suites',
    distanceKm: 3.6,
    imageUrl: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/de88ce68-b730-4c7f-b0ee-2a88e93c5f60.jpg',
    rating: 8.7,
    priceSum: 2890000,
    nights: 1,
    guests: 2,
    badges: ['Maxsus taklif', 'Metroga yaqin'],
  },
]
