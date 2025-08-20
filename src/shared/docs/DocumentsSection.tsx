/**
 * DocumentsSection.tsx
 * Home sahifasining oxiridagi “Hujjatlar” bo‘limi, ichida ID Card namoyishi.
 */

import React from 'react'
import { IDCard } from './IDCard'

/**
 * DocumentsSection
 * Bo‘lim sarlavhasi, qisqa izoh va ID Card namunasi.
 */
export function DocumentsSection() {
  return (
    <section id="docs" className="mx-auto mt-10 w-full max-w-5xl px-2 md:px-4">
      <div className="rounded-3xl bg-white/70 p-4 ring-1 ring-slate-200 backdrop-blur-sm">
        <div className="px-1 pb-3">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">Hujjatlar</h2>
          <p className="mt-1 text-sm text-slate-600">
            Sayohat uchun zarur hujjatlar. Quyida ID karta namunasi keltirilgan.
          </p>
        </div>

        <div className="flex justify-center">
          <IDCard
            fullName="Jahongir Ergashev"
            docNumber="AA1234567"
            nationality="O‘zbekiston"
            expires="12.10.2030"
          />
        </div>
      </div>
      {/* Pastki bo'sh joy */}
      <div className="h-4" />
    </section>
  )
}

export default DocumentsSection
