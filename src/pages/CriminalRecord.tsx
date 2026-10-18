import { motion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'

export default function CriminalRecord({
  onNext,
  onPrev
}: {
  onNext: () => void
  onPrev: () => void
}) {
  return (
    <section className="w-full max-w-3xl paper-card p-6 md:p-8">
      <p className="handwritten text-sm tracking-[0.18em] text-pink-600">
        OFFICIAL BIRTHDAY EVIDENCE FILE
      </p>
      <h1 className="handwritten text-4xl mb-5">Criminal Record · {birthdayConfig.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {birthdayConfig.crimes.map((crime, index) => (
          <motion.article
            key={crime}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="paper-card border border-pink-100 p-4"
          >
            <h2 className="handwritten text-xl font-bold">
              Exhibit #{String(index + 1).padStart(2, '0')} · SUSPECT: {birthdayConfig.nickname}
            </h2>
            <p className="mt-2">{crime}</p>
          </motion.article>
        ))}
      </div>
      <div className="flex justify-between items-center mt-6 gap-4">
        <button onClick={onPrev} className="underline">
          Back
        </button>
        <button onClick={onNext} className="bg-pastel-yellow px-6 py-3 rounded-lg">
          SHOW FAKE GIFT 🎁
        </button>
      </div>
    </section>
  )
}
