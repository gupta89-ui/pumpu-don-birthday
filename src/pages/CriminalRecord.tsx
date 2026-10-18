import React from 'react'
import { birthdayConfig } from '../config/birthday'
import { motion } from 'framer-motion'

export default function CriminalRecord({onNext}:{onNext:()=>void}){
  const crimes = birthdayConfig.crimes
  return (
    <div className="w-full max-w-3xl p-4">
      <div className="handwritten text-2xl mb-4">Criminal Record</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crimes.map((c,i)=> (
          <motion.div key={i} initial={{scale:0.9, opacity:0}} animate={{scale:1, opacity:1}} transition={{delay:i*0.12}} className="paper-card p-4">
            <div className="text-lg font-bold">Crime #{String(i+1).padStart(2,'0')}</div>
            <div className="mt-2">{c}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button onClick={onNext} className="bg-pastel-yellow px-6 py-3 rounded">SHOW FAKE GIFT</button>
      </div>
    </div>
  )
}
