import { useEffect, useState } from 'react'
import { birthdayConfig } from '../config/birthday'
import { getBirthdayCountdown, formatBirthdayDate } from '../utils/birthday'
import NoButtonGame from '../components/NoButtonGame'

export default function PrankLanding({ onNext }: { onNext: () => void }) {
  const [countdown, setCountdown] = useState(() =>
    getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
  )
  const [showConfirm, setShowConfirm] = useState(false)
  const birthdayDate = formatBirthdayDate(
    birthdayConfig.birthdayMonth,
    birthdayConfig.birthdayDay
  )

  useEffect(() => {
    const update = () =>
      setCountdown(
        getBirthdayCountdown(birthdayConfig.birthdayMonth, birthdayConfig.birthdayDay)
      )
    const id = window.setInterval(update, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section className="w-full max-w-xl paper-card p-6 md:p-8 handwritten text-center">
      <div className="text-2xl">🚨 IMPORTANT NOTICE 🚨</div>
      <p className="mt-3">
        {birthdayDate} ko ek bahut hi dangerous event hone wala hai...
      </p>
      <p className="mt-3 text-lg">Subject: {birthdayConfig.name}</p>
      <p className="mt-2 text-pink-600">
        Status: {countdown.isBirthday ? "It's her birthday today! 🎂" : 'Birthday incoming...'}
      </p>
      <p className="mt-4 text-xl">
        {countdown.isBirthday
          ? 'The birthday celebrations are officially under investigation 🎉'
          : `Countdown: ${countdown.days}d ${countdown.hours}h ${countdown.minutes}m ${countdown.seconds}s`}
      </p>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="mt-6 bg-pastel-yellow px-6 py-3 rounded-lg shadow"
        >
          I AM READY 😎
        </button>
      ) : (
        <div className="mt-6">
          <p className="text-lg">Are you REALLY ready? 🤨</p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4">
            <button
              onClick={onNext}
              className="px-6 py-3 bg-pastel-pink rounded shadow"
            >
              YES 😎
            </button>
            <NoButtonGame onNext={onNext} onPrev={() => setShowConfirm(false)} />
          </div>
        </div>
      )}
    </section>
  )
}
