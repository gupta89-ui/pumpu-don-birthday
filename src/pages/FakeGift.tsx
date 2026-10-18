import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'

export default function FakeGift({
  onNext,
  onPrev
}: {
  onNext: () => void
  onPrev: () => void
}) {
  const [opened, setOpened] = useState(false)
  const [reveal, setReveal] = useState(false)

  useEffect(() => {
    if (!opened) return
    const timer = window.setTimeout(() => setReveal(true), 700)
    return () => window.clearTimeout(timer)
  }, [opened])

  return (
    <section className="w-full max-w-2xl paper-card p-6 md:p-8 text-center">
      <p className="handwritten text-sm tracking-[0.18em] text-pink-600">
        A VERY OFFICIAL PRESENT
      </p>
      <h1 className="handwritten text-3xl mt-2 mb-5">🎁 Your birthday gift is ready</h1>
      <motion.button
        type="button"
        aria-label={opened ? 'Birthday gift opened' : 'Open your wrapped birthday gift'}
        onClick={() => setOpened(true)}
        whileHover={!opened ? { scale: 1.04, rotate: -2 } : undefined}
        animate={opened ? { scale: 1.04, rotate: -5 } : { scale: 1 }}
        transition={{ type: 'spring' }}
        className="gift-illustration"
      >
        <svg viewBox="0 0 240 220" className="gift-drawing" aria-hidden="true">
          <ellipse cx="120" cy="195" rx="78" ry="12" fill="#d9c9b5" opacity=".45" />
          <rect x="53" y="93" width="134" height="97" rx="6" fill="#f18497" stroke="#9e435e" strokeWidth="4" />
          <path d="M101 95v93h37V95" fill="#f7d669" stroke="#9e435e" strokeWidth="3" />
          <path d="M55 124h130v20H55z" fill="#73cbc0" stroke="#9e435e" strokeWidth="3" />
          <circle cx="75" cy="158" r="5" fill="#fff1ce" />
          <circle cx="166" cy="176" r="5" fill="#fff1ce" />
          <circle cx="165" cy="104" r="4" fill="#fff1ce" />
          <motion.g
            animate={opened ? { y: -29, rotate: -10 } : { y: 0, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 15 }}
            style={{ transformOrigin: '120px 98px' }}
          >
            <rect x="48" y="80" width="144" height="26" rx="6" fill="#f1cb5d" stroke="#9e435e" strokeWidth="4" />
            <path d="M103 82v22h35V82" fill="#6bc5bd" stroke="#9e435e" strokeWidth="3" />
            <path d="M120 80C74 63 78 34 99 41c12 4 18 20 21 39Zm1 0c45-17 41-46 20-39-12 4-18 20-21 39Z" fill="#8bd2c4" stroke="#9e435e" strokeWidth="4" strokeLinejoin="round" />
            <circle cx="120" cy="80" r="8" fill="#f7d669" stroke="#9e435e" strokeWidth="3" />
          </motion.g>
        </svg>
      </motion.button>
      <p className="handwritten mt-3">
        {opened ? 'surprise, sunshine! 💝' : 'a little something for you'}
      </p>

      <AnimatePresence>
        {reveal && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 handwritten"
            role="status"
          >
            <h2 className="text-2xl">CONGRATULATIONS 🎉</h2>
            <p className="mt-2">You received... ABSOLUTELY NOTHING 😂</p>
            <p className="mt-3">WAIT, WAIT, WAIT 😭 I was kidding.</p>
            <p className="mt-3">
              Your real present is a little birthday world, made just for {birthdayConfig.name}. 💗
            </p>
            <button
              onClick={onNext}
              className="mt-5 bg-pastel-yellow px-6 py-3 rounded-lg shadow"
            >
              OKAY, SHOW ME 😤
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={onPrev} className="block mx-auto mt-5 underline">
        Back
      </button>
    </section>
  )
}
