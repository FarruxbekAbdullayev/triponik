/**
 * TransferResultsScreen.tsx
 * "Transferni qidirish" uchun yengil (light) tema natijalari sahifasi (UZ).
 * Ichki overlay sifatida ham, alohida sahifa sifatida ham ishlashi mumkin.
 */

import React from 'react'
import { useNavigate } from 'react-router'
import TransferHeaderBar from './components/TransferHeaderBar'
import TransferClassCard from './components/TransferClassCard'
import { demoTransferClasses } from './types'

/** Props: overlay rejimida onBack orqali yopiladi */
export interface TransferResultsScreenProps {
  /** Orqaga bosilganda (overlay yopish) */
  onBack?: () => void
  /** Meta ma'lumot (masalan, "Toshkent → Samarqand, 12 avg 10:00") */
  meta?: string
}

export default function TransferResultsScreen({ onBack, meta }: TransferResultsScreenProps) {
  const nav = useNavigate()
  const handleBack = () => {
    if (onBack) return onBack()
    nav('/')
  }

  /** Tanlash bosilganda demo harakat */
  function handleSelect(id: string) {
    // Bu yerda keyingi bosqich (manzil tasdiqlash yoki to'lov) ochilishi mumkin.
    // Hozircha faqat alert bilan ko'rsatamiz.
    alert(`Tanlandi: ${id}`)
  }

  return (
    <div className="mx-auto max-w-md bg-slate-50 min-h-full">
      <TransferHeaderBar onBack={handleBack} meta={meta} />

      {/* Kontent */}
      <div className="space-y-4 px-4 py-4 pb-8">
        {demoTransferClasses.map((t) => (
          <TransferClassCard key={t.id} item={t} onSelect={handleSelect} />
        ))}
      </div>
    </div>
  )
}
