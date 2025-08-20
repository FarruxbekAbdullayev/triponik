/**
 * BrandHeader.tsx
 * Light tema uchun brend sarlavhasi: chapda SVG logo, o'ngda yordam chat tugmasi.
 * Popup o'rniga onOpenChat callback bilan alohida sahifa ochiladi.
 */

import React from 'react'
import { MessageCircle } from 'lucide-react'

/**
 * LogoTriponik
 * SVG logotip, qayta foydalanish uchun komponent.
 */
export interface LogoTriponikProps {
  /** Ixtiyoriy className: o'lcham va joylashuvni boshqarish */
  className?: string
}

/**
 * SVG logotip (viewBox 0 0 78 34). Ranglari #0D193E va #3050F9.
 */
export function LogoTriponik({ className }: LogoTriponikProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 78 34"
      className={className}
      role="img"
      aria-label="Triponik logo"
    >
      <g clipPath="url(#logo_triponik_clip)">
        <path d="M65.5449 28.6816V10.0879H68.3483V21.6691L74.3702 15.0816H77.6667L72.6571 20.5801L77.9782 28.6816H74.6557L70.7363 22.6785L68.3483 25.2285V28.6816H65.5449Z" fill="#0D193E"></path>
        <path d="M62.9788 13.168C62.0184 13.168 61.2656 12.4508 61.2656 11.4414C61.2656 10.432 62.0184 9.71484 62.9788 9.71484C63.9392 9.71484 64.6919 10.432 64.6919 11.4414C64.6919 12.4508 63.9392 13.168 62.9788 13.168ZM61.5512 28.6805V15.0805H64.3545V28.6805H61.5512Z" fill="#0D193E"></path>
        <path d="M55.2117 14.9219C58.1448 14.9219 60.5588 16.5688 60.5588 21.1109V28.6813H57.7295V21.35C57.7295 18.7734 56.6653 17.3922 54.5628 17.3922C52.3305 17.3922 51.0067 19.0656 51.0067 21.8281V28.6813H48.2034V15.0813H50.6433L50.9548 16.8609C51.7854 15.7984 53.0573 14.9219 55.2117 14.9219Z" fill="#0D193E"></path>
        <path d="M40.7319 28.8406C36.6826 28.8406 33.9572 26.0516 33.9572 21.8813C33.9572 17.7375 36.6826 14.9219 40.7319 14.9219C44.7811 14.9219 47.5066 17.7375 47.5066 21.8813C47.5066 26.0516 44.7811 28.8406 40.7319 28.8406ZM40.7319 26.3969C43.0939 26.3969 44.6513 24.5109 44.6513 21.8813C44.6513 19.2516 43.0939 17.3656 40.7319 17.3656C38.3698 17.3656 36.8383 19.2516 36.8383 21.8813C36.8383 24.5109 38.3698 26.3969 40.7319 26.3969Z" fill="#0D193E"></path>
        <path d="M27.4803 14.9219C31.1143 14.9219 33.7618 17.525 33.7618 21.8813C33.7618 26.0781 31.1143 28.8406 27.4803 28.8406C25.4297 28.8406 24.0021 27.9906 23.1715 26.7687V33.9937H20.3682V15.0813H22.8081L23.1455 17.1C24.0281 15.9047 25.4038 14.9219 27.4803 14.9219ZM27.0131 26.4234C29.3492 26.4234 30.9066 24.5375 30.9066 21.8813C30.9066 19.1984 29.3492 17.3656 27.0131 17.3656C24.677 17.3656 23.1455 19.1984 23.1455 21.8281C23.1455 24.5375 24.677 26.4234 27.0131 26.4234Z" fill="#0D193E"></path>
        <path d="M17.801 13.168C16.8406 13.168 16.0879 12.4508 16.0879 11.4414C16.0879 10.432 16.8406 9.71484 17.801 9.71484C18.7614 9.71484 19.5142 10.432 19.5142 11.4414C19.5142 12.4508 18.7614 13.168 17.801 13.168ZM16.3734 28.6805V15.0805H19.1767V28.6805H16.3734Z" fill="#0D193E"></path>
        <path d="M15.5794 15.082H16.2024V17.7648H14.9564C12.4646 17.7648 11.6599 19.757 11.6599 21.8555V28.682H8.85657V15.082H11.3484L11.6599 17.1273C12.3348 15.9852 13.399 15.082 15.5794 15.082Z" fill="#0D193E"></path>
        <path d="M2.40098 24.9894V17.6051H0.0908203V15.0816H2.40098V11.2832H5.23026V15.0816H8.47485V17.6051H5.23026V24.6973C5.23026 25.7598 5.59366 26.1582 6.65788 26.1582H8.63059V28.6816H6.03492C3.49116 28.6816 2.40098 27.4598 2.40098 24.9894Z" fill="#0D193E"></path>
        <path d="M50.5338 14.1644H34.1776L28.583 8.43931L30.9629 6.00381C31.4079 6.44937 32.0168 6.72416 32.6886 6.72417C34.0517 6.72417 35.1568 5.59335 35.1568 4.1984C35.1568 3.51095 34.8883 2.88783 34.4529 2.4324L36.7612 0.0703125L50.5338 14.1644ZM34.5193 9.86835C34.2383 9.54127 33.7515 9.50909 33.4319 9.7965C33.1122 10.0839 33.0808 10.5821 33.3616 10.9092C33.6425 11.2363 34.1293 11.2685 34.4491 10.981C34.7686 10.6936 34.8 10.1955 34.5193 9.86835ZM36.9429 7.68887C36.662 7.36183 36.1752 7.32964 35.8556 7.61702C35.5359 7.90445 35.5045 8.40272 35.7854 8.72984C36.0663 9.0569 36.553 9.08907 36.8727 8.80169C37.1923 8.51426 37.2237 8.01599 36.9429 7.68887ZM39.3667 5.50953C39.0859 5.18244 38.5989 5.15028 38.2793 5.43767C37.9596 5.7251 37.9282 6.22326 38.2091 6.55037C38.4899 6.87749 38.9769 6.90966 39.2965 6.62222C39.616 6.33479 39.6476 5.83662 39.3667 5.50953Z" fill="#3050F9"></path>
        <path d="M51.0996 7.71875C51.0782 7.76854 51.06 7.81904 51.0457 7.87024C50.8289 8.64409 51.5245 9.27138 52.5995 9.27138C53.6744 9.27137 54.7215 8.64408 54.9383 7.87024C54.9527 7.81906 54.963 7.76851 54.9695 7.71875H58.3296L51.0989 14.1646L46.7764 9.57592L48.5582 7.71875H51.0996Z" fill="#3050F9"></path>
      </g>
      <defs>
        <clipPath id="logo_triponik_clip">
          <rect width="78" height="34" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

/** BrandHeader propslari */
export interface BrandHeaderProps {
  /** Yordam chatni ochish callback'i (alohida sahifa) */
  onOpenChat?: () => void
}

/**
 * BrandHeader
 * Light fon, nozik aksent tugma; logo chapda, chat tugmasi o‘ngda.
 * onOpenChat bo'lsa, bosilganda ichki chat sahifasini ochadi.
 */
export function BrandHeader({ onOpenChat }: BrandHeaderProps) {
  return (
    <div className="px-4 pt-2">
      {/* Yuqori qator: logo (chap) + support chat (o'ng) */}
      <div className="mb-2 flex items-center justify-between">
        {/* SVG logo */}
        <div className="flex items-center">
          <LogoTriponik className="h-6 w-auto md:h-7" />
        </div>

        {/* Support chat tugmasi */}
        <button
          type="button"
          aria-label="Yordam chat"
          onClick={onOpenChat}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 ring-1 ring-slate-200 shadow-sm transition hover:text-[#3050F9] hover:ring-[#3050F9]/40"
        >
          <MessageCircle size={18} />
        </button>
      </div>
    </div>
  )
}

export default BrandHeader
