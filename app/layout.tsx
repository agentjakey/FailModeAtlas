import type { Metadata } from 'next'
import { Sora, Lora, DM_Mono } from 'next/font/google'
import './globals.css'
import { Nav } from '@/components/ui/Nav'
import { ReadingProgress } from '@/components/ui/ReadingProgress'

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Failure Mode Atlas: A Map of AI Safety Concepts',
  description:
    'An interactive visual essay mapping 24 AI failure modes across 6 families. Learn reward hacking, deceptive alignment, prompt injection, and more through safe examples and guided paths.',
  keywords: [
    'AI safety',
    'alignment',
    'failure modes',
    'reward hacking',
    'deceptive alignment',
    'prompt injection',
    'mechanistic interpretability',
    'AI education',
  ],
  authors: [{ name: 'Jacob Ortiz' }],
  openGraph: {
    title: 'Failure Mode Atlas',
    description: 'A careful map of AI safety concepts.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${lora.variable} ${dmMono.variable}`}>
        <ReadingProgress />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
