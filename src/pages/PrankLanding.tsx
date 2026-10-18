import React, { useState, useEffect } from 'react'
import { birthdayConfig } from '../config/birthday'
import { motion } from 'framer-motion'
import NoButtonGame from '../components/NoButtonGame'

export default function PrankLanding({onNext}:{onNext:()=>void}){
  const [countdown, setCountdown] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)

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
      setCountdown(`${days}d ${hrs}h ${mins}m ${secs}s`)
    }
    update(); const id = setInterval(update,1000)
    return ()=> clearInterval(id)
  },[])

  return (
    <div className="w-full max-w-xl paper-card p-6 handwritten text-center">
      <div className="text-2xl">🚨 IMPORTANT NOTICE 🚨</div>
      <div className="mt-2">18 October ko ek bahut hi dangerous event hone wala hai...</div>
      <div className="mt-3 text-lg">Subject: {birthdayConfig.name}</div>
      <div className="mt-2 handwritten text-pink-600">Status: Birthday Incoming... 🎂</div>
      <div className="mt-4 text-xl">Countdown: {countdown}</div>

      {!showConfirm ? (
        <div className="mt-6">
          <button onClick={()=>setShowConfirm(true)} className="bg-pastel-yellow px-6 py-3 rounded-lg">I AM READY 😎</button>
        </div>
      ) : (
        <div className="mt-6">
          <div className="text-lg">Are you REALLY ready? 🤨</div>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={onNext} className="px-6 py-3 bg-pastel-pink rounded">YES 😎</button>
            <NoButtonGame onNext={onNext} onPrev={()=>setShowConfirm(false)} />
          </div>
        </div>
      )}
    </div>
  )
}
