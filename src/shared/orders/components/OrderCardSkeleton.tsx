/**
 * OrderCardSkeleton.tsx
 * Buyurtma kartalari uchun yengil shimer skelet komponenti.
 * variant = 'hotel' (vertikal, grid 2-ustun) yoki 'default' (klassik, 1-ustun).
 */

import React from 'react'

/** Skelet varianti */
export interface OrderCardSkeletonProps {
  /** Ko‘rinish varianti */
  variant?: 'hotel' | 'default'
}

/**
 * OrderCardSkeleton
 * Foydalanuvchi ma'lumotlari yuklanayotgan paytda placeholder ko‘rsatadi.
 */
export function OrderCardSkeleton({ variant = 'default' }: OrderCardSkeletonProps) {
  if (variant === 'hotel') {
    return (
      <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        {/* Rasm joyi */}
        <div className="relative w-full">
          <div className="skeleton relative w-full pb-[66%]" />
        </div>
        <div className="p-3">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="mt-2 skeleton h-3 w-1/2 rounded" />
          <div className="mt-2 skeleton h-3 w-full rounded" />
          <div className="mt-2 flex items-center justify-between">
            <div className="skeleton h-5 w-16 rounded-md" />
            <div className="skeleton h-5 w-24 rounded" />
          </div>
          <div className="mt-2 skeleton h-3 w-2/3 rounded" />
        </div>
      </div>
    )
  }

  // default
  return (
    <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
      <div className="mb-1 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="skeleton h-8 w-8 rounded-lg" />
          <div className="min-w-0 flex-1">
            <div className="skeleton h-4 w-3/5 rounded" />
            <div className="mt-2 skeleton h-3 w-2/5 rounded" />
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="skeleton h-5 w-16 rounded-md" />
          <div className="skeleton h-4 w-20 rounded" />
        </div>
      </div>
      <div className="mt-2 skeleton h-3 w-1/2 rounded" />
    </div>
  )
}

export default OrderCardSkeleton
