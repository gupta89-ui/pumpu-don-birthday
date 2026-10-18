import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
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
  const [isOpen, setIsOpen] = useState(false)
  const [text, setText] = useState('')
  const [replay, setReplay] = useState(0)
  const reduceMotion = useReducedMotion()
  const complete = isOpen && text === letter

  useEffect(() => {
    if (!isOpen) {
      setText('')
      return
    }

    if (reduceMotion) {
      setText(letter)
      return
    }

    const characters = Array.from(letter)
    let index = 0
    setText('')
    const timer = window.setInterval(() => {
      index += 1
      setText(characters.slice(0, index).join(''))
      if (index >= characters.length) window.clearInterval(timer)
    }, 24)
    return () => window.clearInterval(timer)
  }, [letter, replay, isOpen, reduceMotion])

  return (
    <section className="birthday-letter-card paper-card" aria-labelledby="birthday-letter-title">
      <div className="letter-tape"><Tape /></div>
      <p className="letter-eyebrow handwritten">NO JOKES FOR A SECOND</p>
      <h1 id="birthday-letter-title" className="letter-title handwritten">
        A little letter for {birthdayConfig.nickname} 💌
      </h1>
      <p className="letter-subtitle">
        A note from your best friend, with all the words I hope you remember.
      </p>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="sealed-letter"
            className="letter-envelope"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            aria-label="A sealed birthday letter"
          >
            <span className="letter-envelope-heart" aria-hidden="true">♥</span>
            <p className="handwritten">A little note, just for you.</p>
            <button
              type="button"
              className="scrapbook-button handwritten"
              onClick={() => setIsOpen(true)}
            >
              OPEN YOUR LETTER 💌
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="open-letter"
            className="letter-paper"
            initial={{ opacity: 0, y: 12, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
          >
            <span className="letter-paper-heart" aria-hidden="true">♡</span>
            <div className="letter-body typewriter" aria-label="Birthday letter text">
              {text}
              {!complete && <span aria-hidden="true" className="letter-caret">▍</span>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="letter-actions">
        <button type="button" className="scrapbook-back-button" onClick={onPrev}>
          ← BACK TO MEMORIES
        </button>
        <div className="letter-next-actions">
          {complete && (
            <button
              type="button"
              className="scrapbook-back-button"
              onClick={() => setReplay((value) => value + 1)}
            >
              ↻ READ IT AGAIN
            </button>
          )}
          <button
            type="button"
            className="scrapbook-button handwritten"
            onClick={onNext}
          >
            FINAL SURPRISE 💝
          </button>
        </div>
      </div>
      <div className="letter-sticker"><Sticker /></div>
    </section>
  )
}
