'use client'

import { motion } from 'framer-motion'
import { AudienceTrack } from '@/components/ui/AudienceTrack'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function Hero() {
  return (
    <section id="hero" className="border-b border-border">
      <motion.div
        className="mx-auto px-8"
        style={{ maxWidth: '680px', paddingTop: '120px', paddingBottom: '80px' }}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.p
          variants={item}
          className="font-mono text-accent"
          style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '32px' }}
        >
          Latent Space Lab
        </motion.p>

        <motion.div variants={item}>
          <h1
            className="font-sans font-bold text-primary"
            style={{
              fontSize: '64px',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
            }}
          >
            Failure Mode Atlas
          </h1>
          <p
            className="font-sans font-normal text-secondary"
            style={{ fontSize: '22px', marginTop: '12px', lineHeight: 1.4 }}
          >
            A careful map of AI safety concepts.
          </p>
        </motion.div>

        <motion.p
          variants={item}
          className="font-serif italic text-secondary"
          style={{ fontSize: '17px', lineHeight: 1.7, marginTop: '40px', marginBottom: '24px' }}
        >
          &ldquo;AI systems rarely fail in neat boxes.&rdquo;
        </motion.p>

        <motion.p
          variants={item}
          className="font-serif text-primary"
          style={{ fontSize: '19px', lineHeight: 1.85 }}
        >
          As I have been learning AI safety and alignment, I wanted a way to see how the vocabulary
          connects: reward hacking, specification gaming, sycophancy, prompt injection, sandbagging,
          distribution shift, deceptive alignment, and more. This is a map for learning, not a
          detector. The goal is not certainty. The goal is a better starting point for reflection.
        </motion.p>

        <motion.div
          variants={item}
          className="flex flex-wrap items-center gap-4 border-t border-border"
          style={{ marginTop: '40px', paddingTop: '32px' }}
        >
          <AudienceTrack />
          <span className="font-sans text-secondary" style={{ fontSize: '12px', marginLeft: '16px' }}>
            ~10 min read
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
