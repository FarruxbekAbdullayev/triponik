/**
 * TourResultsScreen.tsx
 * Tour search results with: header, date tabs, cards, and inline filter sheet.
 * Header now shows two lines: destination on the first line; date + nights on the second.
 */

import React, { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import TourHeaderBar from './components/TourHeaderBar'
import TourCard from './components/TourCard'
import TourDateTabs from './components/TourDateTabs'
import { demoTours } from './types'
import TourFiltersSheet, { defaultTourFilters, TourFilters } from './components/TourFiltersSheet'

/** Props: overlay mode can pass onBack; meta is unused currently but kept for compatibility */
export interface TourResultsScreenProps {
  onBack?: () => void
  meta?: string
}

/**
 * Format date as dd.MM.yyyy, e.g., 22.08.2025
 */
function formatDateDot(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = d.getFullYear()
  return `${dd}.${mm}.${yyyy}`
}

/**
 * Build two-line header from URL query:
 * - q: name (first line)
 * - date: YYYY-MM-DD (second line start)
 * - nights: single nights value (fallback if range not provided)
 * - nightsMin/nightsMax: nights range (preferred)
 */
function useHeaderFromQuery() {
  const { search } = useLocation()

  return useMemo(() => {
    const sp = new URLSearchParams(search)

    // Line 1 — destination name
    const name = (sp.get('q') || '').trim()

    // Line 2 — date + nights
    const dateStr = (sp.get('date') || '').trim()
    let datePart = ''
    if (dateStr) {
      const d = new Date(dateStr)
      if (!isNaN(d.getTime())) datePart = formatDateDot(d)
    }

    const nMinRaw = sp.get('nightsMin')
    const nMaxRaw = sp.get('nightsMax')
    const nRaw = sp.get('nights')

    const nMin = nMinRaw ? Number(nMinRaw) : NaN
    const nMax = nMaxRaw ? Number(nMaxRaw) : NaN
    const n = nRaw ? Number(nRaw) : NaN

    let nightsText = ''
    if (!isNaN(nMin) && !isNaN(nMax) && nMin > 0 && nMax >= nMin) {
      nightsText = `${nMin} - ${nMax} ночей`
    } else if (!isNaN(n) && n > 0) {
      nightsText = `${n} ночей`
    }

    let subtitle = ''
    if (datePart && nightsText) subtitle = `${datePart}, ${nightsText}`
    else if (datePart) subtitle = datePart
    else if (nightsText) subtitle = nightsText

    const title = name || 'Turlar'
    return { title, subtitle }
  }, [search])
}

/**
 * TourResultsScreen
 * - Header with two-line title
 * - Date tabs
 * - Results list
 * - Inline filter sheet
 */
export default function TourResultsScreen({ onBack, meta }: TourResultsScreenProps) {
  const nav = useNavigate()
  const handleBack = () => {
    if (onBack) return onBack()
    nav('/')
  }

  // Demo card action
  function handleShow(id: string) {
    alert(`Tanlangan tur: ${id}`)
  }

  // Filters state
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [filters, setFilters] = useState<TourFilters>(defaultTourFilters)

  // Header values from query
  const { title, subtitle } = useHeaderFromQuery()

  // Demo filtering: by budget only
  const filteredTours = useMemo(() => {
    const [min, max] = filters.budget
    return demoTours.filter((t) => {
      const price = (t as any)?.priceUsd ?? 1200
      return price >= min && price <= max
    })
  }, [filters, demoTours])

  return (
    <div className="relative mx-auto max-w-md bg-slate-50 min-h-[100dvh]">
      <TourHeaderBar
        onBack={handleBack}
        onOpenFilters={() => setFiltersOpen(true)}
        title={title}
        subtitle={subtitle}
      />

      {/* Content container */}
      <div className="space-y-4 px-4 py-4 pb-8">
        {/* Date + cheapest tabs */}
        <TourDateTabs inset size="sm" />

        {/* Results list */}
        {filteredTours.map((t: any) => (
          <TourCard key={t.id} item={t} onShow={handleShow} />
        ))}
      </div>

      {/* Filters panel — inline */}
      <TourFiltersSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        value={filters}
        onChange={setFilters}
        onApply={(v) => setFilters(v)}
        inline
      />
    </div>
  )
}
