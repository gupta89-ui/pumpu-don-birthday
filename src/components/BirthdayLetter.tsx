import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Tape from './Tape'
import Sticker from './Sticker'
import { birthdayConfig } from '../config/birthday'

export default function BirthdayLetter({
  letter,
  onNext,
  onPrev
}: {
  letter: string
  onNext: () => void
  onPrev: () => void
}) {
  const [text, setText] = useState('')
  const [replay, setReplay] = useState(0)
  const complete = text === letter

  useEffect(() => {
    const characters = Array.from(letter)
    let index = 0
    setText('')
    const timer = window.setInterval(() => {
      index += 1
      setText(characters.slice(0, index).join(''))
      if (index >= characters.length) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [letter, replay])

  return (
    <section className="w-full max-w-3xl paper-card p-6 md:p-8 relative">
      <div className="absolute -top-4 left-6"><Tape /></div>
      <p className="handwritten text-sm tracking-[0.18em] text-pink-600">NO JOKES FOR A SECOND</p>
      <h1 className="handwritten text-3xl mt-2">A little letter for {birthdayConfig.nickname} 💌</h1>
      <p className="mt-1 text-sm text-slate-600">A note from your best friend, with all the words I hope you remember.</p>
      <motion.div
        className="typewriter mt-5 bg-white/50 rounded-lg p-4 whitespace-pre-wrap text-sm md:text-base leading-relaxed"
        aria-label="Birthday letter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {text}
        {!complete && <span className="animate-pulse" aria-hidden="true">▍</span>}
      </motion.div>

      <div className="flex flex-wrap justify-between items-center gap-3 mt-6">
        <button onClick={onPrev} className="underline">
          Back
        </button>
        <div className="flex gap-3">
          {complete && (
            <button onClick={() => setReplay((value) => value + 1)} className="underline">
              ↻ Read it again
            </button>
          )}
          <button onClick={onNext} className="bg-pastel-pink px-5 py-3 rounded-lg">
            FINAL SURPRISE 💝
          </button>
        </div>
      </div>
      <div className="absolute -bottom-6 right-6"><Sticker /></div>
    </section>
  )
}
