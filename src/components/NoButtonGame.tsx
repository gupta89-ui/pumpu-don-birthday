import React, { useState, useRef } from 'react'

type Props = { onNext: ()=>void; onPrev?: ()=>void }

export default function NoButtonGame({ onNext, onPrev }: Props){
  const [tries, setTries] = useState(0)
  const [message, setMessage] = useState('Try again')
  const noRef = useRef<HTMLButtonElement|null>(null)
  const [unlocked, setUnlocked] = useState(false)

  function handleNoEnter(){
    setTries(t=>t+1)
    const el = noRef.current
    if(!el) return
    const x = (Math.random()*120) - 60
    const y = (Math.random()*60) - 30
    el.style.transform = `translate(${x}px, ${y}px)`
    if(tries >= 4){
      setMessage("Okay okay... you win 😂❤️")
      setUnlocked(true)
      if((window as any)._birthdayAudioEngine) (window as any)._birthdayAudioEngine.playDing()
    }
  }

  return (
    <div className="w-full max-w-xl paper-card p-6 handwritten text-center">
      <h2 className="text-3xl">WHY DID YOU CLICK NO?! 😭</h2>
      <p className="mt-4">{message}</p>
      <div className="mt-6 flex justify-center gap-6">
        <button className="px-6 py-3 bg-pastel-pink rounded-lg shadow" onClick={onNext}>YES</button>
        <button ref={noRef} className="px-6 py-3 bg-pastel-blue rounded-lg shadow" onMouseEnter={handleNoEnter} onTouchStart={handleNoEnter} onClick={()=>setMessage('Try again')}>NO</button>
      </div>
      <div className="mt-4">
        <button className={`px-4 py-2 rounded ${unlocked? 'bg-teal-300' : 'bg-gray-200 cursor-not-allowed'}`} onClick={unlocked? onNext: undefined}>{unlocked? "Okay let's go ❤️" : 'Keep trying'}</button>
      </div>
      <div className="mt-4">
        <button className="text-sm underline" onClick={onPrev}>Back</button>
      </div>
    </div>
  )
}
