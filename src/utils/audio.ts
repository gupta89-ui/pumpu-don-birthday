// Lightweight WebAudio engine for playful melody and effects
export type AudioEngine = {
  startMelody: ()=>void
  stopMelody: ()=>void
  playDing: ()=>void
  playBuzz: ()=>void
  playSample?: ()=>Promise<void>
  stopAll?: ()=>void
}

let engine: AudioEngine | null = null

export function getAudioEngine(): AudioEngine{
  if(engine) return engine
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext
  const ctx = new AudioCtx()
  let melodyInterval: number | null = null
  let masterGain = ctx.createGain(); masterGain.gain.value = 0.12; masterGain.connect(ctx.destination)
  let sampleSource: AudioBufferSourceNode | null = null

  function playNote(freq:number, time:number, dur=0.3){
    const o = ctx.createOscillator()
    const o2 = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o2.type = 'square'
    o.frequency.value = freq
    o2.frequency.value = freq * 0.999
    o2.detune.value = -10
    g.gain.value = 0
    const merger = ctx.createGain()
    o.connect(merger); o2.connect(merger); merger.connect(g); g.connect(masterGain)
    const now = ctx.currentTime + time
    g.gain.setValueAtTime(0, now)
    g.gain.linearRampToValueAtTime(0.12, now + 0.01)
    g.gain.linearRampToValueAtTime(0.001, now + dur)
    o.start(now); o2.start(now); o.stop(now + dur + 0.05); o2.stop(now + dur + 0.05)
  }

  function startMelody(){
    if(melodyInterval != null) return
    const pattern = [440, 550, 660, 880, 660, 550]
    let i = 0
    melodyInterval = window.setInterval(()=>{
      const f = pattern[i % pattern.length]
      playNote(f, 0, 0.45)
      i++
    }, 420)
  }

  async function tryLoadSample(){
    try{
      const res = await fetch('/sounds/vocal.mp3', { method: 'HEAD' })
      if(!res.ok) return null
      const r = await fetch('/sounds/vocal.mp3')
      const data = await r.arrayBuffer()
      return await ctx.decodeAudioData(data)
    }catch(e){ return null }
  }

  async function playSampleLoop(){
    const buf = await tryLoadSample()
    if(!buf) return
    if(sampleSource) sampleSource.stop()
    sampleSource = ctx.createBufferSource(); sampleSource.buffer = buf; sampleSource.loop = true
    sampleSource.connect(masterGain); sampleSource.start()
  }

  function stopMelody(){
    if(melodyInterval != null){ window.clearInterval(melodyInterval); melodyInterval = null }
  }

  function playDing(){ playNote(880, 0, 0.25); playNote(1320, 0.02, 0.18) }

  function playBuzz(){
    const bufferSize = ctx.sampleRate * 0.2
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for(let i=0;i<bufferSize;i++) data[i] = (Math.random()*2-1)*0.25
    const src = ctx.createBufferSource(); src.buffer = buffer
    const g = ctx.createGain(); g.gain.value = 0.9
    src.connect(g); g.connect(masterGain)
    src.start()
  }

  function stopAll(){ stopMelody(); if(sampleSource){ sampleSource.stop(); sampleSource = null } }

  engine = { startMelody, stopMelody, playDing, playBuzz, playSample: playSampleLoop, stopAll }
  return engine
}
