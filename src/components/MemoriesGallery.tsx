import React, { useState } from 'react'
import { motion } from 'framer-motion'

import { AnimatePresence } from 'framer-motion'
import Sticker from './Sticker'

type Memory = { image: string; caption: string }

export default function MemoriesGallery({ memories, onNext, onPrev }:{ memories: Memory[]; onNext:()=>void; onPrev?:()=>void }){
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <div className="w-full max-w-4xl">
      <div className="handwritten text-4xl mb-4 relative">Memories
        <div className="absolute -top-4 -left-6"><Sticker /></div>
      </div>
      <div className="mb-4">
        <div className="paper-card p-3 flex items-center gap-3">
          <span>🔍</span>
          <input className="flex-1 bg-transparent outline-none" placeholder="Moments of us ❤️" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {memories.map((m, i)=> (
          <motion.div key={i} whileHover={{scale:1.04, rotate: (i%2?2:-2)}} className="bg-white p-2 rounded-md shadow-sm transform cursor-pointer" onClick={()=>setLightbox(i)}>
            <div className="border-2 border-white shadow-sm" style={{transform: `rotate(${(i%5)-2}deg)`}}>
              <img src={m.image} alt={m.caption} className="w-full h-44 object-cover" />
            </div>
            <div className="text-sm handwritten mt-2">{m.caption}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
      {lightbox !== null && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
          <motion.div initial={{y:40, scale:0.95}} animate={{y:0, scale:1}} exit={{y:40, scale:0.95}} className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
            <img src={memories[lightbox].image} alt="" className="w-full h-auto rounded" />
            <div className="handwritten mt-2 text-lg">{memories[lightbox].caption}</div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="underline">Back</button>
        <button onClick={onNext} className="bg-pastel-yellow px-4 py-2 rounded">Next →</button>
      </div>
    </div>
  )
}
