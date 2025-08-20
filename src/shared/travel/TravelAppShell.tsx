/** 
 * TravelAppShell.tsx
 * Main container for the travel app UI inside the device frame.
 * Controls the bottom TabBar and animates section changes.
 * Qidiruv natijalari va Yordam chat endi ichki overlay sifatida ko'rsatiladi.
 */

import React, { useMemo, useState } from 'react'
import { StatusBar } from '../mobile/StatusBar'
import { TabBar, type TabKey } from '../mobile/TabBar'
import { SearchTabs } from './components/SearchTabs'
import { PromoCarousel } from './components/PromoCarousel'
import { BrandHeader } from './components/BrandHeader'
import { User } from 'lucide-react'
import { OrdersScreen } from '../orders/OrdersScreen'
import { BlogScreen } from '../blog/BlogScreen'
import { ProfileScreen } from '../profile/ProfileScreen'
import '../../styles/animations.css'
import { NavChipsBar, type NavKey } from './components/NavChipsBar'
import { StoriesRail } from './components/StoriesRail'
import type { SearchFormValues } from './components/SearchForm'
import { FlightResultsScreen } from '../flights/FlightResultsScreen'
import HotelsResultsScreen from '../hotels/HotelsResultsScreen'
import CarRentResultsScreen from '../carrent/CarRentResultsScreen'
import TransferResultsScreen from '../transfer/TransferResultsScreen'
import TourResultsScreen from '../tours/TourResultsScreen'
import SupportChatScreen from '../support/SupportChatScreen'

/** Props for placeholder sections */
interface PlaceholderProps {
  /** Icon component */
  icon: React.ComponentType<{ size?: number; className?: string }>
  /** Title text */
  title: string
  /** Optional description */
  desc?: string
}

/**
 * PlaceholderSection
 * Simple informational card used for tabs without final design yet.
 */
function PlaceholderSection({ icon: Icon, title, desc }: PlaceholderProps) {
  return (
    <div className="mt-3 flex-1 overflow-y-auto pb-20">
      <div className="flex h-full items-center justify-center px-6">
        <div className="w-full max-w-sm rounded-2xl bg-white/95 p-6 text-center ring-1 ring-white/10">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3050F9]/10 text-[#3050F9] ring-1 ring-[#3050F9]/20">
            <Icon size={22} />
          </div>
          <div className="text-base font-semibold text-slate-900">{title}</div>
          {desc && <div className="mt-1 text-sm text-slate-500">{desc}</div>}
        </div>
      </div>
    </div>
  )
}

/**
 * TravelAppShell
 * - Keeps Search centered in the TabBar
 * - Attaches TabBar to bottom (no gap)
 * - Animates content on tab change
 * - Default active tab: 'orders'
 * - Light background enforced on container
 * - Search/Support natijalari ichki overlay ko‘rinishida (onBack bilan yopiladi)
 */
export function TravelAppShell() {
  const [tab, setTab] = useState<TabKey>('orders')

  /** Qidiruv natijalari overlay holati */
  const [resultsOpen, setResultsOpen] = useState(false)
  const [lastQuery, setLastQuery] = useState<SearchFormValues | null>(null)

  /** Support chat overlay holati */
  const [supportOpen, setSupportOpen] = useState(false)

  /** Sahifa bo‘limlariga silliq scroll navigatsiyasi */
  function handleNavigate(key: NavKey) {
    let targetId: string = 'section-banners'
    if (key === 'deals') targetId = 'section-deals'
    if (key === 'weekend') targetId = 'section-weekend'
    if (key === 'popular') targetId = 'section-banners'
    if (key === 'features') targetId = 'section-banners'

    const el = document.getElementById(targetId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  /** Build content for each tab */
  const content = useMemo(() => {
    if (tab === 'search') {
      return (
        <>
          <div className="page-enter">
            <SearchTabs
              onSearch={(values) => {
                // Qidiruv bosildi: overlay ochamiz va so‘rovni saqlab qo‘yamiz
                setLastQuery(values)
                setResultsOpen(true)
              }}
            />
          </div>
          {/* Space to avoid overlap with bottom bar (bar h-20) */}
          <div className="pointer-events-none h-20" aria-hidden />
        </>
      )
    }
    if (tab === 'home') {
      // Scroll konteyner: BrandHeader (logo) + NavChipsBar (sticky) + StoriesRail + PromoCarousel
      return (
        <div className="page-enter relative flex h-full min-h-0 flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <BrandHeader onOpenChat={() => setSupportOpen(true)} />
            <NavChipsBar onNavigate={handleNavigate} />
            {/* Stories logodan keyin va navbar ostida */}
            <div className="px-4">
              <StoriesRail className="mt-2" />
            </div>
            <div className="mt-3 pb-20">
              <PromoCarousel />
            </div>
          </div>
        </div>
      )
    }
    if (tab === 'orders') {
      return <OrdersScreen />
    }
    if (tab === 'benefits') {
      return <BlogScreen />
    }
    if (tab === 'profile') {
      return <ProfileScreen />
    }
    return (
      <div className="page-enter">
        <PlaceholderSection
          icon={User}
          title="Profil"
          desc="Shaxsiy ma’lumotlar va sozlamalar."
        />
      </div>
    )
  }, [tab])

  return (
    // Light background for the whole app surface; TabBar remains dark
    <div className="relative flex h-full min-h-0 flex-col bg-slate-50">
      {/* Status Bar */}
      <StatusBar />

      {/* Animated content keyed by tab to ensure mount animation */}
      <div className="relative flex-1 min-h-0">
        {content}

        {/* Ichki natijalar overlay: barcha kontent ustiga chiqadi */}
        {resultsOpen && (
          <div className="absolute inset-0 z-20 bg-slate-50 overflow-y-auto">
            {lastQuery?.mode === 'hotel' ? (
              <HotelsResultsScreen onBack={() => setResultsOpen(false)} />
            ) : lastQuery?.mode === 'carRent' ? (
              <CarRentResultsScreen onBack={() => setResultsOpen(false)} />
            ) : lastQuery?.mode === 'transfer' ? (
              <TransferResultsScreen onBack={() => setResultsOpen(false)} meta="Bron uchun minimal 6 soat oldin" />
            ) : lastQuery?.mode === 'tour' ? (
              <TourResultsScreen onBack={() => setResultsOpen(false)} />
            ) : (
              <FlightResultsScreen onBack={() => setResultsOpen(false)} />
            )}
          </div>
        )}

        {/* Yordam chat overlay (to'liq sahifa) */}
        {supportOpen && (
          <SupportChatScreen onBack={() => setSupportOpen(false)} />
        )}
      </div>

      {/* Bottom Tab Bar – natijalar yoki support ochiq bo'lsa, yashiramiz */}
      {!resultsOpen && !supportOpen && <TabBar active={tab} onChange={setTab} />}
    </div>
  )
}
