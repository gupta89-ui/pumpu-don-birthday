import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Tape from './Tape'
import Sticker from './Sticker'

export default function BirthdayLetter({ letter, onNext, onPrev }:{ letter: string; onNext:()=>void; onPrev?:()=>void }){
  const [text, setText] = useState('')
  useEffect(()=>{
    let i = 0
    const handle = setInterval(()=>{
      setText(letter.slice(0,i))
      i++
      if(i > letter.length) clearInterval(handle)
    }, 28)
    return ()=> clearInterval(handle)
  },[letter])

  return (
    <div className="w-full max-w-3xl paper-card p-6 relative">
      <div className="absolute -top-4 left-6"><Tape /></div>
      <div className="handwritten text-xl">With Love ❤️</div>
      <motion.div className="typewriter mt-4 bg-white/0 p-4 whitespace-pre-wrap text-base leading-relaxed" initial={{opacity:0}} animate={{opacity:1}}>{text}</motion.div>

      <div className="flex justify-between mt-6">
        <button onClick={onPrev} className="underline">Back</button>
        <button onClick={onNext} className="bg-pastel-pink px-4 py-2 rounded">Next →</button>
      </div>
      <div className="absolute -bottom-6 right-6"><Sticker /></div>
    </div>
  )
}
