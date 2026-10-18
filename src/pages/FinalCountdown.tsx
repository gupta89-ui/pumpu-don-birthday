import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'
import { formatBirthdayDate, getBirthdayCountdown } from '../utils/birthday'

export default function FinalCountdown({
  onNext,
  onPrev
}: {
  onNext: () => void
  onPrev: () => void
}) {
  const [time, setTime] = useState(() =>
    getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
  )
  const birthdayDate = formatBirthdayDate(
    birthdayConfig.birthdayMonth,
    birthdayConfig.birthdayDay
  )

  useEffect(() => {
    const update = () =>
      setTime(
        getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
      )
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl paper-card p-6 md:p-10 text-center handwritten"
    >
      <p className="text-sm tracking-[0.2em] text-pink-600">THE BIRTHDAY COUNTDOWN</p>
      <h1 className="text-3xl md:text-5xl mt-3">
        {time.isBirthday
          ? `IT'S YOUR DAY, ${birthdayConfig.nickname.toUpperCase()}! 🎂`
          : 'Your birthday magic is on its way ✨'}
      </h1>
      <p className="mt-3 text-lg">
        {time.isBirthday
          ? `Happy Birthday, ${birthdayConfig.name}! Today is all about you. 🥹💗`
          : `Counting down to ${birthdayDate} — your very own birthday celebration.`}
      </p>

      <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3 text-2xl">
        {[
          ['Days', time.days],
          ['Hours', time.hours],
          ['Minutes', time.minutes],
          ['Seconds', time.seconds]
        ].map(([label, value]) => (
          <div key={label} className="paper-card border border-pink-100 p-4">
            <div>{value}</div>
            <div className="text-sm">{label}</div>
          </div>
        ))}
      </div>

      <p className="mt-6">
        {time.isBirthday
          ? 'Birthday girl gets all the love, all day long. 💌'
          : 'A little more time until the birthday confetti takes over...'}
      </p>
      <div className="mt-7 flex justify-between items-center gap-4">
        <button onClick={onPrev} className="underline">
          Back
        </button>
        <button onClick={onNext} className="bg-pastel-pink px-6 py-3 rounded-lg shadow">
          OPEN YOUR MEMORIES 💌
        </button>
      </div>
    </motion.section>
  )
}
