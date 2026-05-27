import dynamic from 'next/dynamic'
import { Hero } from '@/components/sections/Hero'
import { Section1TheIdea } from '@/components/sections/Section1TheIdea'
import { Section2Vocabulary } from '@/components/sections/Section2Vocabulary'
import { Section7Safety } from '@/components/sections/Section7Safety'
import { Section8Methods } from '@/components/sections/Section8Methods'
import { Section9StartHere } from '@/components/sections/Section9StartHere'
import { Footer } from '@/components/ui/Footer'

// Client-heavy sections loaded dynamically to avoid SSR issues with D3 and browser APIs
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

export default function Page() {
  return (
    <>
      <Hero />
      <Section1TheIdea />
      <Section2Vocabulary />
      <Section3Atlas />
      <Section4Cards />
      <Section5Compare />
      <Section6Paths />
      <Section7Safety />
      <Section8Methods />
      <Section9StartHere />
      <Footer />
    </>
  )
}
