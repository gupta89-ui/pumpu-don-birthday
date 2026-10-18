import React, { useState } from 'react'
import PasscodeScreen from './components/PasscodeScreen'
import PageTransition from './components/PageTransition'
import PrankLanding from './pages/PrankLanding'
import Investigation from './pages/Investigation'
import CriminalRecord from './pages/CriminalRecord'
import FakeGift from './pages/FakeGift'
import FinalCountdown from './pages/FinalCountdown'
import NoButtonGame from './components/NoButtonGame'
import MemoriesGallery from './components/MemoriesGallery'
import BirthdayLetter from './components/BirthdayLetter'
import UniverseCollage from './components/UniverseCollage'
import MusicToggle from './components/MusicToggle'
import FloatingHearts from './components/FloatingHearts'
import Confetti from './components/Confetti'
import { birthdayConfig } from './config/birthday'

export type Page = 0|1|2|3|4

export default function App(){
  const [page, setPage] = useState<Page>(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const key = page

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <MusicToggle />
      <FloatingHearts />
      {showConfetti && <Confetti />}

      <div className="w-full flex items-center justify-center">
        {key === 0 && (
          <PageTransition visible={key===0}><PrankLanding onNext={()=>setPage(1)} /></PageTransition>
        )}

        {key === 1 && (
          <PageTransition visible={key===1}><Investigation onNext={()=>setPage(2)} /></PageTransition>
        )}

        {key === 2 && (
          <PageTransition visible={key===2}><CriminalRecord onNext={()=>setPage(3)} /></PageTransition>
        )}

        {key === 3 && (
          <PageTransition visible={key===3}><FakeGift onNext={()=>setPage(4)} /></PageTransition>
        )}

        {key === 4 && (
          <PageTransition visible={key===4}><FinalCountdown onNext={()=>setPage(5)} /></PageTransition>
        )}

        {key === 5 && (
          <PageTransition visible={key===5}><div className="paper-card p-6 handwritten text-center"> <div className="text-xl">Until then...</div><div className="mt-2">Please behave yourself.<br/>You are being monitored 👁️😂</div><div className="mt-4"><button onClick={()=>{ alert("HAHAHAHAHA 😂\nWe both know that's a lie."); setPage(0) }} className="bg-pastel-yellow px-6 py-3 rounded">I'LL BEHAVE 🤞</button></div></div></PageTransition>
        )}
      </div>
    </div>
  )
}
