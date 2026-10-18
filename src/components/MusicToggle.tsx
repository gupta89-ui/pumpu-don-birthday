import React, { useState } from 'react'
import { getAudioEngine } from '../utils/audio'

export default function MusicToggle(){
  const [playing, setPlaying] = useState(false)
  let engine = (window as any)._birthdayAudioEngine as ReturnType<typeof getAudioEngine> | undefined
  const [sampleAvailable, setSampleAvailable] = useState(false)
  const [usingSample, setUsingSample] = useState(false)

  React.useEffect(()=>{
    (async ()=>{
      try{
        const res = await fetch('/sounds/vocal.mp3', { method: 'HEAD' })
        setSampleAvailable(res.ok)
      }catch(e){ setSampleAvailable(false) }
    })()
  },[])

  function toggle(){
    if(!engine){ engine = getAudioEngine(); (window as any)._birthdayAudioEngine = engine }
    if(playing){
      if(usingSample && engine.playSample) engine.stopAll && engine.stopAll()
      else engine.stopMelody()
      setPlaying(false)
    } else {
      if(usingSample && engine.playSample) engine.playSample()
      else engine.startMelody()
      setPlaying(true)
    }
  }

  return (
    <div className="fixed top-4 right-4">
      <div className="flex gap-2 items-center">
        <button onClick={toggle} aria-label="music toggle" className="px-3 py-2 bg-white rounded-full shadow">
          {playing? '🔊' : '🔈'}
        </button>
        {sampleAvailable && (
          <button onClick={()=>setUsingSample(s=>!s)} className={`px-3 py-2 rounded ${usingSample? 'bg-teal-200' : 'bg-gray-100'}`}>{usingSample? 'Sample' : 'Synth'}</button>
        )}
      </div>
    </div>
  )
}
