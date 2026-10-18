import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from './Confetti'
import Sticker from './Sticker'
import Tape from './Tape'

// use global audio engine if present
declare global { interface Window { _birthdayAudioEngine?: any } }

type Props = { passcode: string; onSuccess: ()=>void }

export default function PasscodeScreen({ passcode, onSuccess }: Props){
  const [input, setInput] = useState('')
  const [shake, setShake] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState('')

  function press(key:string){
    if(key === '*' ) return setInput('')
    if(key === '#'){
      if(input === passcode){
        setSuccess(true)
        setMessage('Yay! Opening... 🎉')
        if(window._birthdayAudioEngine) window._birthdayAudioEngine.playDing()
        setTimeout(()=> onSuccess(), 900)
      } else {
        setShake(true)
        setMessage("Hmm... try again 🥺")
        if(window._birthdayAudioEngine) window._birthdayAudioEngine.playBuzz()
        setTimeout(()=>{ setShake(false); setMessage('') },800)
      }
      return
    }
    if(input.length >= 4) return
    setInput(prev=>prev+key)
  }

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="w-full max-w-3xl flex flex-col md:flex-row items-center gap-6 relative">
      <div className="flex-1 flex items-center justify-center">
        <div className="relative">
          <img src="/images/character.svg" alt="cute character" className="w-56 h-56 object-contain" />
          <div className="absolute -top-3 -left-6"><Tape /></div>
          <div className="absolute -bottom-3 -right-6"><Sticker /></div>
        </div>
      </div>

      <div className="flex-1 p-6 paper-card">
        <h2 className="handwritten text-2xl mb-4">Enter a passcode 💌</h2>

        <motion.div animate={shake?{x:[0,-10,10,-8,6,0]}:{x:0}} className="flex gap-2 mb-2">
          {[0,1,2,3].map(i=> (
            <div key={i} className="w-12 h-12 bg-white/80 rounded-md flex items-center justify-center shadow text-lg">{input[i] ? '•' : ''}</div>
          ))}
        </motion.div>

        <div className="text-sm handwritten text-pink-600 mb-3">{message}</div>

        <div className="grid grid-cols-3 gap-3">
          {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(k=> (
            <button key={k} onClick={()=>press(String(k))} className="py-4 rounded-lg bg-cream shadow-md active:scale-95">{k}</button>
          ))}
        </div>
      </div>
      {success && <Confetti />}
    </motion.div>
  )
}
