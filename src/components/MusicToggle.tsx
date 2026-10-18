import { useRef, useState } from 'react'

export default function MusicToggle({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')

  async function toggle() {
    const audio = audioRef.current
    if (!audio) return

    if (playing) {
      audio.pause()
      return
    }

    setError('')
    try {
      await audio.play()
    } catch (playError) {
      console.error('Birthday music could not start:', playError)
      setError('The music could not start. Tap play again or check your browser audio settings.')
    }
  }

  return (
    <div className="music-toggle">
      <audio
        ref={audioRef}
        src={src}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setPlaying(false)
          setError('This local music file could not be loaded.')
        }}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${title}` : `Play ${title}`}
        aria-pressed={playing}
        className="music-toggle-button"
      >
        {playing ? '⏸ Pause music' : '▶ Play music'}
      </button>
      {error && (
        <p className="music-toggle-error" role="status">
          {error}
        </p>
      )}
    </div>
  )
}
