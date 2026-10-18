import React from 'react'
import { birthdayConfig } from '../config/birthday'

export default function Investigation({onNext}:{onNext:()=>void}){
  return (
    <div className="w-full max-w-xl paper-card p-6 handwritten">
      <div className="text-2xl">🕵️ BIRTHDAY INVESTIGATION REPORT</div>
      <div className="mt-4">Name: {birthdayConfig.name}</div>
      <div>Birthday: 18 October</div>
      <div>Status: Classified 🔐</div>

      <div className="mt-4">Funny statistics:</div>
      <ul className="list-disc pl-6 mt-2">
        <li>Cute — Sometimes</li>
        <li>Irritating — Frequently</li>
        <li>Pagal — Confirmed</li>
        <li>Drama Level — 100%</li>
        <li>Reply Speed — Depends on Mood</li>
      </ul>

      <div className="mt-4">Threat Level: <span className="text-xl">🔥🔥🔥🔥🔥</span></div>
      <div className="mt-6 flex justify-center">
        <button onClick={onNext} className="bg-pastel-pink px-6 py-3 rounded">SHOW MY CRIMES 👀</button>
      </div>
    </div>
  )
}
