import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

export default function PageTransition({
  children,
  pageKey
}: {
  children: ReactNode
  pageKey: string
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
