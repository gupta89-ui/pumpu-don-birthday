import React, { useEffect, useRef } from 'react'

export default function Confetti(){
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let width = canvas.width = window.innerWidth
    let height = canvas.height = window.innerHeight

    const colors = ['#FFD6E0','#D8EEFF','#FFF3C4','#E9D8FF','#8ED1C6']
    const pieces: any[] = []
    for(let i=0;i<120;i++){
      pieces.push({
        x: Math.random()*width,
        y: Math.random()*-height,
        size: 4+Math.random()*8,
        speed: 1+Math.random()*3,
        color: colors[Math.floor(Math.random()*colors.length)],
        rot: Math.random()*360
      })
    }

    let raf = 0
    function render(){
      ctx.clearRect(0,0,width,height)
      for(const p of pieces){
        p.y += p.speed
        p.x += Math.sin(p.y*0.01)*1.5
        p.rot += 4
        ctx.save()
        ctx.translate(p.x,p.y)
        ctx.rotate(p.rot*Math.PI/180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size/2,-p.size/2,p.size,p.size)
        ctx.restore()
        if(p.y > height + 20){
          p.y = -20
          p.x = Math.random()*width
        }
      }
      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  return <canvas ref={ref} className="pointer-events-none fixed inset-0 w-full h-full" />
}
