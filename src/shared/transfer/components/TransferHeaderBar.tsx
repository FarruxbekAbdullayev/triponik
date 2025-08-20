/**
 * TransferHeaderBar.tsx
 * Transfer natijalari uchun yuqori sticky header: back tugmasi, sarlavha va meta.
 */

import React from 'react'
import { ArrowLeft } from 'lucide-react'

/** Header propslari */
export interface TransferHeaderBarProps {
  /** Orqaga bosilganda */
  onBack?: () => void
  /** Sarlavha matni */
  title?: string
  /** Pastki kichik meta (masalan, manzil, sana) */
  meta?: string
}

/**
 * TransferHeaderBar
 * Light tema: oq fonda, pastga ring va blur.
 */
export default function TransferHeaderBar({ onBack, title = 'Transfer mashina klassini tanlang', meta }: TransferHeaderBarProps) {
  return (
    <div className="sticky top-0 z-20 bg-white/95 backdrop-blur ring-1 ring-slate-200">
      <div className="flex items-center justify-between px-3 py-3">
        <button
          aria-label="Orqaga"
          onClick={onBack}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-700 hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex flex-col items-center">
          <div className="text-sm font-semibold text-slate-900">{title}</div>
          {meta && <div className="text-[11px] text-slate-500">{meta}</div>}
        </div>
        <div className="h-9 w-9" />
      </div>
    </div>
  )
}
