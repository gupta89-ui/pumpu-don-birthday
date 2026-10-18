import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import Sticker from './Sticker'

type Memory = { image: string; caption: string }
type VideoMemory = { src: string; poster: string; title: string; caption: string }

export default function MemoriesGallery({
  memories,
  videos,
  onNext,
  onPrev
}: {
  memories: Memory[]
  videos: VideoMemory[]
  onNext: () => void
  onPrev: () => void
}) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [query, setQuery] = useState('')
  const [failedVideos, setFailedVideos] = useState<string[]>([])
  const filteredMemories = memories.filter((memory) =>
    memory.caption.toLowerCase().includes(query.trim().toLowerCase())
  )

  useEffect(() => {
    if (lightbox === null) return
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setLightbox(null)
      if (event.key === 'ArrowLeft') {
        setLightbox((index) =>
          index === null ? null : (index - 1 + memories.length) % memories.length
        )
      }
      if (event.key === 'ArrowRight') {
        setLightbox((index) =>
          index === null ? null : (index + 1) % memories.length
        )
      }
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [lightbox, memories.length])

  function markVideoAvailable(src: string) {
    setFailedVideos((failed) => failed.filter((item) => item !== src))
  }

  return (
    <section className="w-full max-w-5xl">
      <div className="handwritten text-4xl mb-4 relative">
        OUR MEMORY SCRAPBOOK 📸
        <div className="absolute -top-5 right-0 md:right-8"><Sticker /></div>
      </div>
      <p className="mb-5 handwritten text-lg">
        A little collection of real moments. Let the photos tell their own story. 💌
      </p>
      <label className="paper-card p-3 flex items-center gap-3 mb-5">
        <span aria-hidden="true">🔍</span>
        <input
          className="flex-1 min-w-0 bg-transparent outline-none"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a memory ❤️"
          aria-label="Search photo captions"
        />
      </label>

      {filteredMemories.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
          {filteredMemories.map((memory) => {
            const index = memories.indexOf(memory)
            return (
              <motion.button
                key={memory.image}
                type="button"
                whileHover={{ scale: 1.03, rotate: index % 2 ? 1 : -1 }}
                onClick={() => setLightbox(index)}
                className="memory-card"
                aria-label={`Open photo: ${memory.caption}`}
              >
                <span className="memory-tape" aria-hidden="true"><span /></span>
                <span className="block overflow-hidden rounded border-2 border-white shadow-sm">
                  <img
                    src={memory.image}
                    alt={memory.caption}
                    loading="lazy"
                    className="memory-photo"
                    onError={(event) => {
                      event.currentTarget.src = '/images/placeholder.svg'
                    }}
                  />
                </span>
                <span className="memory-caption handwritten">{memory.caption}</span>
              </motion.button>
            )
          })}
        </div>
      ) : (
        <p className="paper-card p-5 text-center" role="status">
          No photo captions match that search. Try another word 💌
        </p>
      )}

      <div className="mt-10">
        <p className="handwritten text-3xl mb-2">LITTLE MOMENTS, MOVING 🎞️</p>
        <p className="mb-4 text-sm">Press play when you’re ready — sound never starts by itself.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {videos.map((video) => (
            <article key={video.src} className="paper-card p-3">
              <h2 className="handwritten text-2xl mb-2">{video.title}</h2>
              {failedVideos.includes(video.src) ? (
                <div className="video-frame">
                  <div className="w-full h-full bg-white rounded-lg flex flex-col items-center justify-center p-4 text-center">
                    <p role="status">This video could not be played. Check that the local file is available.</p>
                    <button
                      type="button"
                      onClick={() => markVideoAvailable(video.src)}
                      className="mt-3 underline"
                    >
                      TRY AGAIN ↻
                    </button>
                  </div>
                </div>
              ) : (
                <div className="video-frame">
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={video.poster}
                    className="w-full h-full rounded-lg bg-black object-contain"
                    aria-label={video.title}
                    onError={() =>
                      setFailedVideos((failed) =>
                        failed.includes(video.src) ? failed : [...failed, video.src]
                      )
                    }
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded videos.
                  </video>
                </div>
              )}
              <p className="handwritten mt-2">{video.caption}</p>
            </article>
          ))}
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {lightbox !== null && memories[lightbox] && (
            <motion.div
              key="memory-lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lightbox-overlay"
              onClick={(event) => {
                if (event.target === event.currentTarget) setLightbox(null)
              }}
              role="presentation"
            >
              <motion.div
                initial={{ y: 24, scale: 0.98 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 24, scale: 0.98 }}
                className="lightbox-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Memory photo viewer"
              >
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setLightbox(null)}
                    className="lightbox-close-button"
                    aria-label="Close photo viewer"
                  >
                    Close ✕
                  </button>
                </div>
                <div className="lightbox-photo-row">
                  {memories.length > 1 && (
                    <button
                      type="button"
                      className="lightbox-nav-button"
                      onClick={() =>
                        setLightbox((index) =>
                          index === null ? null : (index - 1 + memories.length) % memories.length
                        )
                      }
                      aria-label="Previous photo"
                    >
                      ←
                    </button>
                  )}
                  <img
                    src={memories[lightbox].image}
                    alt={memories[lightbox].caption}
                    className="lightbox-image"
                    onError={(event) => {
                      event.currentTarget.src = '/images/placeholder.svg'
                    }}
                  />
                  {memories.length > 1 && (
                    <button
                      type="button"
                      className="lightbox-nav-button"
                      onClick={() =>
                        setLightbox((index) =>
                          index === null ? null : (index + 1) % memories.length
                        )
                      }
                      aria-label="Next photo"
                    >
                      →
                    </button>
                  )}
                </div>
                <p className="lightbox-caption handwritten">
                  {memories[lightbox].caption}
                </p>
                <p className="lightbox-counter">
                  Photo {lightbox + 1} of {memories.length}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      <div className="flex justify-between mt-6 gap-4">
        <button type="button" onClick={onPrev} className="scrapbook-back-button">
          Back
        </button>
        <button type="button" onClick={onNext} className="scrapbook-button handwritten">
          READ YOUR LETTER 💌
        </button>
      </div>
    </section>
  )
}
