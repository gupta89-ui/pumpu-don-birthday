import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function FakeGift({onNext}:{onNext:()=>void}){
  const [opened, setOpened] = useState(false)
  const [reveal, setReveal] = useState(false)

  function open(){
    setOpened(true)
    setTimeout(()=>{ setReveal(true) }, 1200)
  }

  return (
    <div className="w-full max-w-2xl p-6 text-center">
      <div className="handwritten text-2xl mb-4">🎁 YOUR BIRTHDAY GIFT IS READY</div>
      <div className="flex justify-center">
        <motion.div animate={opened? {scale:1.05, rotate:-6} : {scale:1}} transition={{type:'spring'}} className="w-56 h-56 bg-pastel-pink rounded-lg flex items-center justify-center shadow-lg cursor-pointer" onClick={open}>
          <div className="text-4xl">🎁</div>
        </motion.div>
      </div>

      {reveal && (
        <div className="mt-6 handwritten">
          <div className="text-xl">CONGRATULATIONS 🎉</div>
          <div className="mt-2">You received... ABSOLUTELY NOTHING 😂</div>
          <div className="mt-4">WAIT WAIT WAIT 😭</div>
          <div className="mt-2">I was kidding.</div>
          <div className="mt-4">
            <button onClick={()=>{ alert('Nice try 😂\nYour actual gift unlocks on 18 OCTOBER.'); onNext() }} className="bg-pastel-yellow px-6 py-3 rounded">OKAY GIVE ME MY GIFT 😤</button>
          </div>
        </div>
      )}
    </div>
  )
}
