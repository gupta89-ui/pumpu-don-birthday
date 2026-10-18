import { useState } from 'react'
import { birthdayConfig } from '../config/birthday'
import { formatBirthdayDate } from '../utils/birthday'

const questions = [
  {
    prompt: 'Madam ji, whose day is it today?',
    options: ['My cat’s 🐈', 'NASA’s 🚀', 'Kum Kum’s! 🎂'],
    answer: 2,
    reaction: 'Exactly right! Full marks, birthday queen. 👑'
  },
  {
    prompt: 'What is your smile worth?',
    options: ['One chocolate and a treat 😂', 'Priceless 💗', 'A tiny fortune'],
    answer: 1,
    reaction: 'Correct! Smile tax: one more smile, please. 😄'
  },
  {
    prompt: 'What should the birthday girl get today?',
    options: ['Happiness ✨', 'Lots of love 🫂', 'All her dreams coming true 🌟', 'ALL OF THE ABOVE 🥹❤️'],
    answer: 3,
    reaction: 'Birthday wish list approved. ✅'
  }
]

export default function Investigation({
  onNext,
  onPrev
}: {
  onNext: () => void
  onPrev: () => void
}) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const question = questions[questionIndex]
  const birthdayDate = formatBirthdayDate(
    birthdayConfig.birthdayMonth,
    birthdayConfig.birthdayDay
  )

  function nextQuestion() {
    if (selectedAnswer === question.answer) setScore((value) => value + 1)
    setSelectedAnswer(null)
    setQuestionIndex((index) => index + 1)
  }

  return (
    <section className="w-full max-w-2xl paper-card p-6 md:p-8 handwritten">
      <p className="text-sm tracking-[0.18em] text-pink-600">🕵️ BIRTHDAY INVESTIGATION REPORT</p>
      <h1 className="text-3xl mt-2">The case of {birthdayConfig.name}</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
        <p>Name: {birthdayConfig.name}</p>
        <p>Birthday: {birthdayDate}</p>
        <p>Suspect status: Classified 🔐</p>
        <p>Threat level: 🔥🔥🔥🔥🔥</p>
      </div>
      <p className="mt-5 text-xl">Funny statistics:</p>
      <ul className="list-disc pl-6 mt-2">
        <li>Cute — Always</li>
        <li>Irritating — Occasionally 😂</li>
        <li>Pagal — Lovingly confirmed</li>
        <li>Drama level — 100%</li>
      </ul>

      {question ? (
        <div className="mt-6 border-t border-pink-100 pt-5">
          <p className="text-sm text-pink-600">
            FIRST, A VERY IMPORTANT TEST · QUESTION {questionIndex + 1}/{questions.length}
          </p>
          <h2 className="text-2xl mt-2">{question.prompt}</h2>
          <div className="grid gap-2 mt-4">
            {question.options.map((option, index) => (
              <button
                key={option}
                type="button"
                aria-pressed={selectedAnswer === index}
                onClick={() => setSelectedAnswer(index)}
                className={`rounded-lg border px-4 py-3 text-left transition ${
                  selectedAnswer === index
                    ? 'bg-pastel-pink border-pink-300'
                    : 'bg-white/80 border-pink-100 hover:bg-pastel-yellow'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer !== null && (
            <p className="mt-3 text-pink-600" role="status">
              {selectedAnswer === question.answer
                ? question.reaction
                : 'A very bold answer... the birthday committee will allow it 😂'}
            </p>
          )}
          <div className="flex justify-between items-center mt-5 gap-3">
            <button onClick={onPrev} className="underline">
              Back
            </button>
            <button
              onClick={nextQuestion}
              disabled={selectedAnswer === null}
              className="bg-pastel-pink px-5 py-3 rounded-lg disabled:opacity-50"
            >
              {questionIndex === questions.length - 1 ? 'FINISH TEST' : 'NEXT QUESTION'}
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center">
          <p className="text-sm text-pink-600">OFFICIAL RESULT</p>
          <h2 className="text-2xl mt-2">
            Certified: one-of-a-kind {birthdayConfig.nickname} 💗
          </h2>
          <p className="mt-2">Score: {score}/{questions.length} (birthday-girl bonus applied 👑)</p>
          <button onClick={onNext} className="mt-5 bg-pastel-yellow px-6 py-3 rounded-lg">
            SHOW MY CRIMES 👀
          </button>
          <button onClick={onPrev} className="block mx-auto mt-3 underline">
            Back
          </button>
        </div>
      )}
    </section>
  )
}
