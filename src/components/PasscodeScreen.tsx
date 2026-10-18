import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'backspace']
const starPositions = [
  { top: '14%', left: '5%', tone: 'yellow' },
  { top: '20%', left: '48%', tone: 'pink' },
  { top: '72%', left: '8%', tone: 'blue' },
  { top: '82%', left: '36%', tone: 'yellow' },
  { top: '13%', right: '8%', tone: 'pink' },
  { top: '76%', right: '6%', tone: 'blue' }
]

export default function PasscodeScreen({
  passcode,
  onSuccess
}: {
  passcode: string
  onSuccess: () => void
}) {
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)

  function press(key: string) {
    setMessage('')
    if (key === 'clear') {
      setInput('')
    } else if (key === 'backspace') {
      setInput((value) => value.slice(0, -1))
    } else if (input.length < passcode.length) {
      setInput((value) => value + key)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (input !== passcode) {
      setMessage('Oopsie, that code is not quite right! Try once more? 💌')
      setInput('')
      return
    }

    setSuccess(true)
    setMessage('Yay! Opening your surprise... 🎉')
    window.setTimeout(onSuccess, 550)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pin-page"
      aria-label="Kum Kum's birthday surprise passcode"
    >
      <div className="pin-decoration pin-paper-crease" aria-hidden="true" />
      <div className="pin-stars" aria-hidden="true">
        {starPositions.map(({ tone, ...position }, index) => (
          <span key={index} className={`pin-star pin-star-${tone}`} style={position}>
            ★
          </span>
        ))}
      </div>

      <div className="pin-portrait-side">
        <div className="portrait-frame">
          <span className="portrait-ring portrait-ring-outer" />
          <span className="portrait-ring portrait-ring-inner" />
          <img
            src="/images/pumpu1.jpeg"
            alt="A favourite birthday memory"
            className="portrait-photo"
          />
          <span className="portrait-flower portrait-flower-left" aria-hidden="true">✿</span>
          <span className="portrait-flower portrait-flower-right" aria-hidden="true">✿</span>
          <span className="portrait-heart" aria-hidden="true">♥</span>
        </div>
        <p className="portrait-caption handwritten">a little memory, made with love</p>
      </div>

      <div className="pin-panel">
        <form onSubmit={submit} className="pin-form">
          <p className="pin-kicker handwritten">a little surprise for</p>
          <h1 className="pin-title handwritten">{birthdayConfig.nickname} 💗</h1>
          <label htmlFor="birthday-passcode" className="pin-label handwritten">
            Enter a passcode
          </label>
          <input
            id="birthday-passcode"
            type="password"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={passcode.length}
            value={input}
            onChange={(event) => {
              setInput(event.target.value.replace(/\D/g, '').slice(0, passcode.length))
              setMessage('')
            }}
            aria-label={`Enter your ${passcode.length}-digit birthday code`}
            className="pin-input"
            aria-describedby="passcode-feedback"
          />
          <div className="pin-dots" aria-hidden="true">
            {Array.from({ length: passcode.length }, (_, index) => (
              <span key={index} className={index < input.length ? 'pin-dot pin-dot-filled' : 'pin-dot'}>
                {index < input.length ? '♥' : '·'}
              </span>
            ))}
          </div>
          <p id="passcode-feedback" className="pin-feedback handwritten" role="status">
            {message || 'hint: birthday date ✨'}
          </p>
          <div className="pin-keypad" aria-label="Passcode keypad">
            {keys.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => press(key)}
                aria-label={
                  key === 'backspace' ? 'Delete last digit' : key === 'clear' ? 'Clear code' : key
                }
                className="pin-key handwritten"
                disabled={success}
              >
                {key === 'backspace' ? '⌫' : key === 'clear' ? '✿' : key}
              </button>
            ))}
          </div>
          <button
            type="submit"
            className="pin-unlock handwritten"
            disabled={success || input.length !== passcode.length}
          >
            {success ? 'UNLOCKED 💝' : 'UNLOCK MY SURPRISE'}
          </button>
          <p className="pin-footer handwritten">made especially for {birthdayConfig.name}</p>
        </form>
      </div>
    </motion.section>
  )
}
