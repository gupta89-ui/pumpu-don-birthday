import { motion } from 'framer-motion'
import Sticker from './Sticker'
import { birthdayConfig } from '../config/birthday'

export default function UniverseCollage({
  memories,
  finalMessage,
  onPrev,
  onRestart
}: {
  memories: { image: string; caption: string }[]
  finalMessage: string
  onPrev: () => void
  onRestart: () => void
}) {
  return (
    <section className="w-full max-w-4xl text-center relative paper-card p-6 md:p-8">
      <motion.h1
        className="handwritten text-3xl md:text-4xl mb-4"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        {finalMessage}
      </motion.h1>
      <div className="absolute -top-4 right-1 md:right-6"><Sticker /></div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05 }}
      >
        {memories.map((memory, index) => (
          <motion.div
            key={memory.image}
            whileHover={{ scale: 1.03 }}
            className="w-full h-36 bg-white rounded overflow-hidden flex items-center justify-center shadow-sm"
          >
            <img
              src={memory.image}
              alt={`${memory.caption}, collage photo ${index + 1}`}
              loading="lazy"
              className="collage-photo"
              onError={(event) => {
                event.currentTarget.src = '/images/placeholder.svg'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      <p className="handwritten text-2xl mt-5">Happy Birthday, {birthdayConfig.name}! ❤️</p>
      <p className="mt-2">Made with all my heart. With all the love in the world.</p>
      <p className="handwritten text-lg mt-3">Your birthday treat is still pending... this website does not count as payment. 😂💌</p>

      <div className="flex justify-center gap-4 mt-6">
        <button onClick={onPrev} className="underline">
          Back to your letter
        </button>
        <button onClick={onRestart} className="bg-pastel-yellow px-5 py-3 rounded-lg">
          REPLAY MY BIRTHDAY SURPRISE ↻
        </button>
      </div>
    </section>
  )
}
