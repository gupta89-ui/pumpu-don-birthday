import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'
import { formatBirthdayDate, getBirthdayCountdown } from '../utils/birthday'

const letterColors = ['#e7747f', '#dbbd54', '#5dbab4', '#758ed0', '#9e82ba']

export default function BirthdayCard({
  onNext,
  onCaseFile
}: {
  onNext: () => void
  onCaseFile: () => void
}) {
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
  )
  const birthdayDate = formatBirthdayDate(
    birthdayConfig.birthdayMonth,
    birthdayConfig.birthdayDay
  )
  const birthdayTitle = ['HAPPY', 'BIRTHDAY,']

  useEffect(() => {
    const timer = window.setInterval(
      () =>
        setCountdown(
          getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
        ),
      1000
    )
    return () => window.clearInterval(timer)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="birthday-card paper-card"
      aria-label="Happy birthday card for Kum Kum"
    >
      <span className="birthday-scribble birthday-scribble-one" aria-hidden="true">✿</span>
      <span className="birthday-scribble birthday-scribble-two" aria-hidden="true">✦</span>
      <span className="birthday-scribble birthday-scribble-three" aria-hidden="true">♥</span>
      <span className="birthday-scribble birthday-scribble-four" aria-hidden="true">✧</span>

      <p className="birthday-eyebrow handwritten">
        {countdown.isBirthday ? "TODAY'S ALL ABOUT YOU" : `${birthdayDate} · SAVE THE DATE`}
      </p>
      <h1 className="birthday-heading handwritten" aria-label={`HAPPY BIRTHDAY, ${birthdayConfig.name.toUpperCase()}!`}>
        {birthdayTitle.map((word, wordIndex) => (
          <span className="birthday-title-line" key={word}>
            {Array.from(word).map((letter, letterIndex) => {
              const index = birthdayTitle
                .slice(0, wordIndex)
                .reduce((length, previous) => length + previous.length, 0) + letterIndex
              return (
                <motion.span
                  key={`${letter}-${letterIndex}`}
                  initial={{ opacity: 0, y: 16, rotate: -8 }}
                  animate={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -3 : 2 }}
                  transition={{ delay: 0.08 + index * 0.045, type: 'spring', stiffness: 180 }}
                  style={{
                    color: letterColors[index % letterColors.length],
                    backgroundColor: index % 2 ? '#fff4d4' : '#fffaf2'
                  }}
                  aria-hidden="true"
                >
                  {letter}
                </motion.span>
              )
            })}
          </span>
        ))}
      </h1>
      <h2 className="birthday-name handwritten">
        {birthdayConfig.name.toUpperCase()}!
      </h2>

      <div className="birthday-photo-frame">
        <img
          src="/images/pumpu.jpg"
          alt="A favourite memory to celebrate Kum Kum's birthday"
          className="birthday-photo"
          onError={(event) => {
            event.currentTarget.src = '/images/placeholder.svg'
          }}
        />
        <span className="birthday-camera-heart" aria-hidden="true">♥</span>
        <span className="birthday-camera-star" aria-hidden="true">✧</span>
      </div>

      <p className="birthday-greeting handwritten">
        {countdown.isBirthday
          ? `Happy birthday to my favourite person ever, ${birthdayConfig.nickname}! 🥹❤️`
          : `${birthdayConfig.nickname}, your birthday magic is nearly here! 🥹❤️`}
      </p>
      <p className="birthday-message">
        {countdown.isBirthday
          ? 'I hope today is full of birthday magic, your favourite people and all the love you deserve.'
          : `Your big day is coming in ${countdown.days} days, ${countdown.hours} hours and ${countdown.minutes} minutes. 🎂`}
      </p>

      <svg
        className="birthday-doodle"
        viewBox="0 0 230 94"
        fill="none"
        aria-hidden="true"
      >
        <path d="M30 84V39m0 10C8 45 9 22 28 24c13 2 12 17 3 24" stroke="#ee8399" strokeWidth="3" strokeLinecap="round" />
        <path d="M66 84V26m0 17c18-18 35-8 18 8L66 67" stroke="#64bbb4" strokeWidth="3" strokeLinecap="round" />
        <path d="M192 84V44m0 12c17-20 35-10 19 7l-19 15" stroke="#e8ba50" strokeWidth="3" strokeLinecap="round" />
        <path d="M30 24c-5-7-11-13-16-10-8 5 3 19 16 19 13-1 23-15 15-20-6-4-12 4-15 11Z" fill="#f5b5c4" stroke="#dc728c" strokeWidth="2" />
        <path d="M66 26c-7-8-6-17 1-17 7 0 9 9 6 17" stroke="#e6a7bb" strokeWidth="2" />
        <path d="M194 46c-8-8-8-18 0-19 8 0 8 10 4 18" stroke="#8aa8d7" strokeWidth="2" />
        <path d="m124 48 3 8 9 1-7 5 2 9-7-5-7 5 3-9-7-5 9-1Z" fill="#f3d876" stroke="#d0ad45" strokeWidth="1.5" />
        <path d="M13 84h207" stroke="#8fc7ba" strokeWidth="2" strokeLinecap="round" strokeDasharray="4 7" />
      </svg>

      <button onClick={onNext} className="scrapbook-button handwritten">
        OPEN YOUR MEMORY BOOK 📸
      </button>
      <button onClick={onCaseFile} className="birthday-case-link handwritten">
        or take a silly birthday quiz first 🕵️
      </button>
    </motion.section>
  )
}
