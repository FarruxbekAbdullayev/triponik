/**
 * Home.tsx
 * Bosh sahifa: iPhone ramkasi ichida to‘liq TravelAppShell'ni ko‘rsatadi.
 * Bu UI avvalgi (device preview) ko‘rinishga qaytarildi.
 */

import React from 'react'
import { IPhoneFrame } from '../shared/device/IPhoneFrame'
import { TravelAppShell } from '../shared/travel/TravelAppShell'

/**
 * Home
 * - Markazda iPhone ramkasi ichida dastur UI'ni namoyish etadi.
 * - Tashqi sahifa soddalashtirilgan fon va sarlavha bilan.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Sarlavha va tavsif */}
      <div className="mx-auto max-w-4xl px-4 pt-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Travel App — Device Preview
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Quyida iPhone ichidagi UI: Search, Home, Orders, Benefits, Profile va ichki overlay natijalari.
        </p>
      </div>

      {/* iPhone preview: markazda joylashgan */}
      <div className="mx-auto mt-6 flex max-w-4xl items-start justify-center px-4 pb-12">
        <IPhoneFrame>
          {/* Asosiy ilova qobig‘i (iPhone ichida ishlaydi) */}
          <TravelAppShell />
        </IPhoneFrame>
      </div>
    </div>
  )
}
