import React from 'react'
import { motion } from 'framer-motion'

export default function FloatingHearts(){
  const hearts = [ {left: '10%', delay:0}, {left:'50%', delay:1}, {left:'85%', delay:0.5} ]
  return (
    <div className="pointer-events-none fixed inset-0">
      {hearts.map((h,i)=> (
        <motion.div key={i} style={{left:h.left}} initial={{y:50, opacity:0}} animate={{y:-120, opacity:[0,1,0]}} transition={{duration:6, repeat: Infinity, delay:h.delay}} className="absolute">
          <div className="text-2xl">💖</div>
        </motion.div>
      ))}
    </div>
  )
}
