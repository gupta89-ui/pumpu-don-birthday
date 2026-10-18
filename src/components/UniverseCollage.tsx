import React from 'react'
import { motion } from 'framer-motion'
import Sticker from './Sticker'

export default function UniverseCollage({ memories, finalMessage, onPrev }:{ memories:{image:string}[]; finalMessage:string; onPrev?:()=>void }){
  return (
    <div className="w-full max-w-4xl text-center relative">
      <motion.div className="handwritten text-3xl mb-4" initial={{y:-10, opacity:0}} animate={{y:0, opacity:1}}>{finalMessage}</motion.div>
      <div className="absolute -top-4 right-6"><Sticker /></div>

      <motion.div className="grid grid-cols-3 md:grid-cols-4 gap-2" initial={{opacity:0}} animate={{opacity:1}} transition={{staggerChildren:0.05}}>
        {Array.from({length:12}).map((_,i)=> (
          <motion.div key={i} whileHover={{scale:1.02}} className="w-full h-36 bg-white rounded overflow-hidden flex items-center justify-center shadow-sm">
            <img src={memories[i % memories.length]?.image || '/images/placeholder.svg'} className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </motion.div>

      <div className="handwritten text-xl mt-4">Happy Birthday ❤️</div>
      <div className="mt-2">Made with all my heart.</div>

      <div className="mt-6">
        <button onClick={onPrev} className="underline">Back</button>
      </div>
    </div>
  )
}
