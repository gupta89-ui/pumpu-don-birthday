import { useState } from 'react'

export default function NoButtonGame({
  onNext,
  onPrev
}: {
  onNext: () => void
  onPrev?: () => void
}) {
  const [tries, setTries] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const unlocked = tries >= 5

  function dodge() {
    if (unlocked) return
    setTries((count) => count + 1)
    setPosition({
      x: Math.random() * 100 - 50,
      y: Math.random() * 40 - 20
    })
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onMouseEnter={dodge}
        onTouchStart={(event) => {
          if (!unlocked) {
            event.preventDefault()
            dodge()
          }
        }}
        onClick={() => {
          if (unlocked) {
            onNext()
          } else {
            dodge()
          }
        }}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
        className="px-6 py-3 bg-pastel-blue rounded-lg shadow transition-transform"
      >
        {unlocked ? "Okay, let's go ❤️" : 'NO 🙈'}
      </button>
      {!unlocked && (
        <span className="text-xs text-slate-500">Psst... it might run away 😉</span>
      )}
      {onPrev && (
        <button type="button" onClick={onPrev} className="text-sm underline">
          Back
        </button>
      )}
    </div>
  )
}
