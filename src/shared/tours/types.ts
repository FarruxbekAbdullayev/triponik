/**
 * types.ts
 * Tour natijalariga oid turlar va demo ma'lumotlar.
 */

export interface TourItem {
  /** Yagona ID */
  id: string
  /** Mehmonxona / resort nomi */
  name: string
  /** Mamlakat nomi */
  country: string
  /** Shahar nomi */
  city: string
  /** Plyajgacha masofa (metr) */
  distanceToBeach: number
  /** Reyting (0..5) */
  rating: number
  /** Oxirgi renovatsiya yili */
  renovationYear: number
  /** Oy davomida nechta bron */
  bookedPerMonth: number
  /** Mavjud joylar kamligi */
  lowAvailability?: boolean
  /** Rasm kaliti (placeholder so'zlari) */
  imageKey: string
  /** Narx (so'm) */
  price: number
}

/** Demo ro'yxat: Sharm-El-Sheyx atrofidagi variantlar */
export const demoTours: TourItem[] = [
  {
    id: 'jaz-belvedere',
    name: 'Jaz Belvedere',
    country: 'Misr',
    city: 'Sharm-El-Sheyx',
    distanceToBeach: 50,
    rating: 4.7,
    renovationYear: 2017,
    bookedPerMonth: 3,
    lowAvailability: true,
    imageKey: 'sharm el sheikh resort beach pool',
    price: 144_940_000,
  },
  {
    id: 'grand-oasis',
    name: 'Grand Oasis',
    country: 'Misr',
    city: 'Sharm-El-Sheyx',
    distanceToBeach: 120,
    rating: 4.5,
    renovationYear: 2019,
    bookedPerMonth: 1,
    imageKey: 'egypt luxury hotel gardens',
    price: 132_500_000,
  },
  {
    id: 'sunrise-arabian',
    name: 'Sunrise Arabian',
    country: 'Misr',
    city: 'Sharm-El-Sheyx',
    distanceToBeach: 80,
    rating: 4.8,
    renovationYear: 2021,
    bookedPerMonth: 5,
    lowAvailability: true,
    imageKey: 'egypt seaside resort aerial',
    price: 159_000_000,
  },
]