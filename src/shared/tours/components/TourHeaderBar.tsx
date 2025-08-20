/**
 * TourHeaderBar.tsx
 * Header for tour results: back button, centered two-line title, and a filters button.
 * Keeps the existing brand colors (deep blue background, white text).
 */

import React from 'react'
import { ChevronLeft, SlidersHorizontal } from 'lucide-react'

/**
 * Props for TourHeaderBar.
 */
export interface TourHeaderBarProps {
  /** Triggered when back button is pressed */
  onBack: () => void
  /** Open filters panel */
  onOpenFilters?: () => void
  /** First line: destination name or fallback */
  title?: string
  /** Second line: date + nights text */
  subtitle?: string
  /** Optional aria-labels override */
  backAriaLabel?: string
  filtersAriaLabel?: string
}

/**
 * TourHeaderBar
 * - Two-line centered title block like:
 *   Египет, Шарм-Эль-Шейх
 *   22.08.2025, 7 - 14 ночей
 * - Colors preserved: dark blue background with white text.
 */
export default function TourHeaderBar({
  onBack,
  onOpenFilters,
  title = 'Turlar',
  subtitle,
  backAriaLabel = 'Orqaga',
  filtersAriaLabel = 'Filtrlar',
}: TourHeaderBarProps) {
  return (
    <div className="bg-[#0B1B70] text-white sticky top-0 z-40">
      <div className="h-14 px-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          aria-label={backAriaLabel}
          className="p-2 rounded hover:bg-white/10 active:bg-white/15 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="min-w-0 text-center pointer-events-none">
          <div className="truncate text-[17px] font-semibold leading-none">{title}</div>
          {subtitle ? (
            <div className="mt-1 text-sm text-white/90 leading-none truncate">{subtitle}</div>
          ) : null}
        </div>

        <div className="flex items-center">
          {onOpenFilters ? (
            <button
              type="button"
              onClick={onOpenFilters}
              aria-label={filtersAriaLabel}
              className="p-2 rounded hover:bg-white/10 active:bg-white/15 transition-colors"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}
        </div>
      </div>
    </div>
  )
}
