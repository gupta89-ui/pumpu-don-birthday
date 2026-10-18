import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PageTransition({ children, visible }:{ children: React.ReactNode; visible: boolean }){
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div key={String(visible)} initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} transition={{duration:0.45}} className="w-full">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
