import React, { useEffect, useState } from 'react'
import { birthdayConfig } from '../config/birthday'
import { motion } from 'framer-motion'

export default function FinalCountdown({onNext}:{onNext:()=>void}){
  const [t, setT] = useState({days:0,hours:0,mins:0,secs:0})

  useEffect(()=>{
    function update(){
      const now = new Date()
      const target = new Date(now.getFullYear(), birthdayConfig.birthdayMonth-1, birthdayConfig.birthdayDay)
      if(target < now) target.setFullYear(now.getFullYear()+1)
      const diff = target.getTime() - now.getTime()
      const days = Math.floor(diff / (1000*60*60*24))
      const hrs = Math.floor((diff%(1000*60*60*24))/(1000*60*60))
      const mins = Math.floor((diff%(1000*60*60))/(1000*60))
      const secs = Math.floor((diff%(1000*60))/1000)
      setT({days, hours:hrs, mins, secs})
    }
    update(); const id = setInterval(update,1000)
    return ()=> clearInterval(id)
  },[])

  return (
    <div className="w-full max-w-3xl p-6 text-center handwritten">
      <div className="text-3xl">🎂 BIRTHDAY PROTOCOL</div>
      <div className="mt-2">ACTIVATION DATE: 18 OCTOBER</div>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xl">
        <div className="paper-card p-4">{t.days}<div className="text-sm">Days</div></div>
        <div className="paper-card p-4">{t.hours}<div className="text-sm">Hours</div></div>
        <div className="paper-card p-4">{t.mins}<div className="text-sm">Minutes</div></div>
        <div className="paper-card p-4">{t.secs}<div className="text-sm">Seconds</div></div>
      </div>

      <div className="mt-6">Floating balloons and stickers emerging...</div>
      <div className="mt-6">
        <button onClick={onNext} className="bg-pastel-pink px-6 py-3 rounded">Until then...</button>
      </div>
    </div>
  )
}
