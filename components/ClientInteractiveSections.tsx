'use client'

import dynamic from 'next/dynamic'

const Section3Atlas = dynamic(
  () => import('@/components/sections/Section3Atlas').then((m) => m.Section3Atlas),
  { ssr: false }
)

const Section4Cards = dynamic(
  () => import('@/components/sections/Section4Cards').then((m) => m.Section4Cards),
  { ssr: false }
)

const Section5Compare = dynamic(
  () => import('@/components/sections/Section5Compare').then((m) => m.Section5Compare),
  { ssr: false }
)

const Section6Paths = dynamic(
  () => import('@/components/sections/Section6Paths').then((m) => m.Section6Paths),
  { ssr: false }
)

export function ClientInteractiveSections() {
  return (
    <>
      <Section3Atlas />
      <Section4Cards />
      <Section5Compare />
      <Section6Paths />
    </>
  )
}