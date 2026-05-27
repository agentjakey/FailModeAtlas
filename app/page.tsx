import { Hero } from '@/components/sections/Hero'
import { Section1TheIdea } from '@/components/sections/Section1TheIdea'
import { Section2Vocabulary } from '@/components/sections/Section2Vocabulary'
import { Section7Safety } from '@/components/sections/Section7Safety'
import { Section8Methods } from '@/components/sections/Section8Methods'
import { Section9StartHere } from '@/components/sections/Section9StartHere'
import { Footer } from '@/components/ui/Footer'
import { ClientInteractiveSections } from '@/components/ClientInteractiveSections'

export default function Page() {
  return (
    <>
      <Hero />
      <Section1TheIdea />
      <Section2Vocabulary />
      <ClientInteractiveSections />
      <Section7Safety />
      <Section8Methods />
      <Section9StartHere />
      <Footer />
    </>
  )
}