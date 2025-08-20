/**
 * types.ts
 * Avto ijara (car rent) bilan bog'liq turlar va demo ma'lumotlar (so'mda).
 */

export interface CarOption {
  /** Unikal identifikator */
  id: string
  /** Model nomi (masalan, Toyota Corolla) */
  name: string
  /** Toifa (masalan, Compact car / Compact SUV) */
  category: string
  /** Rasm URL (yoki smart placeholder) */
  imageUrl?: string
  /** O‘rindiqlar soni */
  seats: number
  /** Sumka/joy soni (bagaj) */
  bags: number
  /** Eshiklar soni */
  doors: number
  /** Uzatma: avtomatmi */
  automatic: boolean
  /** Shuttle bus mavjudligi */
  shuttle: boolean
  /** Provayderlar/brandlar (matn chiplar) */
  providers?: string[]
  /** Kunlik narx (so'm) */
  pricePerDaySum: number
  /** Umumiy narx (so'm) — davrga qarab */
  totalSum: number
  /** Badge/yorliqlar */
  badges?: string[]
}

/** Demo ma'lumotlar: 13-16 Avg (3 kun) Farg‘ona (LAX emas, namunaviy), so'mda */
export const demoCars: CarOption[] = [
  {
    id: 'toyota-corolla',
    name: 'Toyota Corolla',
    category: 'Compact avtomobil',
    imageUrl: 'https://pub-cdn.sider.ai/u/U005H34J6N9/web-coder/6899023214f019f2a8451c21/resource/1e3b8107-faa5-435d-95f4-7781c7687b25.jpg',
    seats: 5,
    bags: 2,
    doors: 4,
    automatic: true,
    shuttle: true,
    providers: ['Europcar 10+'],
    pricePerDaySum: 475000,
    totalSum: 1425000,
    badges: ['Top tanlov', 'Bekor qilish bepul'],
  },
  {
    id: 'toyota-rav4',
    name: 'Toyota RAV4',
    category: 'Compact SUV',
    imageUrl: 'https://sider.ai/autoimage/toyota rav4 suv',
    seats: 5,
    bags: 3,
    doors: 4,
    automatic: true,
    shuttle: true,
    providers: ['Star River', 'Budget 4+'],
    pricePerDaySum: 748700,
    totalSum: 2246100,
    badges: ['Top tanlov', 'Bekor qilish bepul'],
  },
  {
    id: 'hyundai-elantra',
    name: 'Hyundai Elantra',
    category: 'Sedan',
    imageUrl: 'https://sider.ai/autoimage/hyundai elantra',
    seats: 5,
    bags: 2,
    doors: 4,
    automatic: true,
    shuttle: false,
    providers: ['Green Motion'],
    pricePerDaySum: 515000,
    totalSum: 1545000,
    badges: ['Bekor qilish bepul'],
  },
]
