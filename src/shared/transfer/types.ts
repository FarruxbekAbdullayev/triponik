/**
 * types.ts
 * Transfer natijalari uchun turlar va demo ma'lumotlar.
 */

export interface TransferClass {
  /** Yagona ID */
  id: string
  /** Class nomi (masalan, Standard) */
  name: string
  /** Yo'lovchi sig'imi */
  passengers: number
  /** Model misollari (ko'rsatiladi) */
  examples: string
  /** Har safar uchun narx (so'm) */
  price: number
  /** Tavsiya yoki badge matni (ixtiyoriy) */
  badge?: string
  /** Rasm kaliti (placeholder so'zi) */
  imageKey: string
}

/** So'm formatlagich: UZS, kasrsiz, bo'shliqli ajratish */
export function formatUZS(amount: number): string {
  try {
    return new Intl.NumberFormat('uz-UZ', { maximumFractionDigits: 0 }).format(amount) + " so'm"
  } catch {
    return amount.toLocaleString() + " so'm"
  }
}

/** Demo transfer klasslari */
export const demoTransferClasses: TransferClass[] = [
  {
    id: 'standard',
    name: 'Standard',
    passengers: 3,
    examples: 'KIA Cerato, Chery Tiggo va shunga o‘xshash',
    price: 350_000,
    badge: 'Eng yaxshi tanlov',
    imageKey: 'white sedan',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    passengers: 3,
    examples: 'Toyota Camry, Kia K5 va shunga o‘xshash',
    price: 420_000,
    imageKey: 'blue sedan',
  },
  {
    id: 'business-light',
    name: 'Business Light',
    passengers: 3,
    examples: 'BMW 5, Volvo S90 va shunga o‘xshash',
    price: 520_000,
    imageKey: 'grey sedan',
  },
]
