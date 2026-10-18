import { useState } from 'react'
import { MotionConfig } from 'framer-motion'
import BirthdayCard from './components/BirthdayCard'
import BirthdayLetter from './components/BirthdayLetter'
import BirthdayQuiz from './components/BirthdayQuiz'
import Confetti from './components/Confetti'
import FloatingHearts from './components/FloatingHearts'
import MemoriesGallery from './components/MemoriesGallery'
import MusicToggle from './components/MusicToggle'
import PageTransition from './components/PageTransition'
import PasscodeScreen from './components/PasscodeScreen'
import UniverseCollage from './components/UniverseCollage'
import CriminalRecord from './pages/CriminalRecord'
import FakeGift from './pages/FakeGift'
import Investigation from './pages/Investigation'
import PrankLanding from './pages/PrankLanding'
import { birthdayConfig } from './config/birthday'

export type Page =
  | 'passcode'
  | 'gift'
  | 'birthday'
  | 'birthday-quiz'
  | 'prank'
  | 'investigation'
  | 'record'
  | 'memories'
  | 'letter'
  | 'final'

export default function App() {
  const [page, setPage] = useState<Page>('passcode')
  const [showConfetti, setShowConfetti] = useState(false)

  function restart() {
    setShowConfetti(false)
    setPage('passcode')
  }

  function renderPage() {
    switch (page) {
      case 'passcode':
        return (
          <PasscodeScreen
            passcode={birthdayConfig.passcode}
            onSuccess={() => setPage('gift')}
          />
        )
      case 'gift':
        return (
          <FakeGift
            onNext={() => {
              setShowConfetti(true)
              setPage('birthday')
            }}
            onPrev={() => setPage('passcode')}
          />
        )
      case 'birthday':
        return (
          <BirthdayCard
            onNext={() => setPage('memories')}
            onQuiz={() => setPage('birthday-quiz')}
            onCaseFile={() => setPage('prank')}
          />
        )
      case 'birthday-quiz':
        return <BirthdayQuiz onExit={() => setPage('birthday')} />
      case 'prank':
        return <PrankLanding onNext={() => setPage('investigation')} />
      case 'investigation':
        return (
          <Investigation
            onNext={() => setPage('record')}
            onPrev={() => setPage('prank')}
          />
        )
      case 'record':
        return (
          <CriminalRecord
            onNext={() => setPage('memories')}
            onPrev={() => setPage('investigation')}
          />
        )
      case 'memories':
        return (
          <MemoriesGallery
            memories={birthdayConfig.memories}
            videos={birthdayConfig.videos}
            onNext={() => setPage('letter')}
            onPrev={() => setPage('birthday')}
          />
        )
      case 'letter':
        return (
          <BirthdayLetter
            letter={birthdayConfig.letter}
            onNext={() => setPage('final')}
            onPrev={() => setPage('memories')}
          />
        )
      case 'final':
        return (
          <UniverseCollage
            memories={birthdayConfig.memories}
            finalMessage={birthdayConfig.finalMessage}
            onPrev={() => setPage('letter')}
            onRestart={restart}
          />
        )
    }
  }

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={
          page === 'passcode'
            ? 'app-shell-pin'
            : 'app-shell-standard min-h-screen flex flex-col items-center justify-center p-4'
        }
      >
        <MusicToggle src={birthdayConfig.music.src} title={birthdayConfig.music.title} />
        <FloatingHearts />
        {showConfetti && <Confetti />}

        <main
          className={
            page === 'passcode'
              ? 'page-main-pin'
              : 'page-main-standard w-full flex items-center justify-center py-12'
          }
        >
          <PageTransition pageKey={page}>{renderPage()}</PageTransition>
        </main>
      </div>
    </MotionConfig>
  )
}
