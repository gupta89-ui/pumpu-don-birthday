import { useRef, useState, type CSSProperties } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { birthdayConfig } from '../config/birthday'

type QuizMode = 'intro' | 'playing' | 'results'

const confettiPieces = Array.from({ length: 12 }, (_, index) => index)

export default function BirthdayQuiz({ onExit }: { onExit: () => void }) {
  const [mode, setMode] = useState<QuizMode>('intro')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const submittedRef = useRef(false)
  const reduceMotion = useReducedMotion()
  const questions = birthdayConfig.quizQuestions
  const question = questions[questionIndex]

  function startGame() {
    setQuestionIndex(0)
    setSelectedAnswer(null)
    setSubmitted(false)
    setWasCorrect(false)
    setScore(0)
    submittedRef.current = false
    setMode('playing')
  }

  function submitAnswer() {
    if (selectedAnswer === null || submittedRef.current) return

    submittedRef.current = true
    const correct = selectedAnswer === question.correctAnswer
    setWasCorrect(correct)
    setSubmitted(true)
    if (correct) setScore((currentScore) => currentScore + 1)
  }

  function nextQuestion() {
    if (!submittedRef.current) return

    if (questionIndex === questions.length - 1) {
      setMode('results')
      return
    }

    submittedRef.current = false
    setSelectedAnswer(null)
    setSubmitted(false)
    setWasCorrect(false)
    setQuestionIndex((currentIndex) => currentIndex + 1)
  }

  const resultMessage =
    score === questions.length
      ? 'A perfect score! You know this birthday surprise inside out. 💖'
      : score >= Math.ceil(questions.length / 2)
        ? 'You know your way around this birthday scrapbook! 🎂'
        : 'There are still more sweet surprises to explore. 💌'

  return (
    <motion.section
      className="birthday-quiz-card paper-card"
      aria-labelledby="birthday-quiz-title"
      initial={reduceMotion ? false : { opacity: 0, y: 16, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="quiz-decoration" aria-hidden="true">
        <span>✦</span><span>♡</span><span>✿</span>
      </div>
      <p className="quiz-eyebrow handwritten">A LITTLE BIRTHDAY GAME</p>
      <h1 id="birthday-quiz-title" className="quiz-title handwritten">
        How Well Do You Know {birthdayConfig.name}? 💖
      </h1>

      {mode === 'intro' && (
        <div className="quiz-intro">
          <div className="quiz-intro-sticker" aria-hidden="true">🎂</div>
          <p>
            Five cheerful questions about this birthday surprise. Pick an answer, see how you did,
            and collect your score — no trick questions, promise!
          </p>
          <button type="button" className="scrapbook-button handwritten" onClick={startGame}>
            START GAME ✨
          </button>
          <button type="button" className="scrapbook-back-button" onClick={onExit}>
            BACK TO THE BIRTHDAY CARD
          </button>
        </div>
      )}

      {mode === 'playing' && (
        <div className="quiz-play">
          <div className="quiz-status-row">
            <span className="handwritten">
              QUESTION {questionIndex + 1} OF {questions.length}
            </span>
            <span className="handwritten" aria-live="polite">
              SCORE: {score}/{questions.length}
            </span>
          </div>
          <div
            className="quiz-progress"
            role="progressbar"
            aria-label="Quiz progress"
            aria-valuemin={1}
            aria-valuemax={questions.length}
            aria-valuenow={questionIndex + 1}
          >
            <span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
          </div>
          <fieldset className="quiz-question">
            <legend className="quiz-prompt handwritten">{question.prompt}</legend>
            <div className="quiz-options">
              {question.options.map((option, index) => (
                <button
                  key={option}
                  type="button"
                  className={`quiz-option${selectedAnswer === index ? ' is-selected' : ''}`}
                  aria-pressed={selectedAnswer === index}
                  disabled={submitted}
                  onClick={() => setSelectedAnswer(index)}
                >
                  <span className="quiz-option-letter" aria-hidden="true">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </fieldset>

          {submitted ? (
            <div className={`quiz-feedback${wasCorrect ? ' is-correct' : ' is-incorrect'}`}>
              {wasCorrect && (
                <div className="quiz-confetti" aria-hidden="true">
                  {confettiPieces.map((piece) => (
                    <span
                      key={piece}
                      style={
                        { '--piece-index': piece } as CSSProperties & {
                          '--piece-index': number
                        }
                      }
                    >
                      {piece % 3 === 0 ? '✦' : piece % 3 === 1 ? '●' : '♥'}
                    </span>
                  ))}
                </div>
              )}
              <p role="status">
                {wasCorrect ? question.correctFeedback : question.incorrectFeedback}
              </p>
            </div>
          ) : (
            <button
              type="button"
              className="scrapbook-button handwritten quiz-submit"
              disabled={selectedAnswer === null}
              onClick={submitAnswer}
            >
              SUBMIT ANSWER
            </button>
          )}

          <div className="quiz-footer">
            <button type="button" className="scrapbook-back-button" onClick={onExit}>
              EXIT TO BIRTHDAY CARD
            </button>
            {submitted && (
              <button
                type="button"
                className="scrapbook-button handwritten"
                onClick={nextQuestion}
              >
                {questionIndex === questions.length - 1 ? 'SEE MY SCORE 🎉' : 'NEXT QUESTION →'}
              </button>
            )}
          </div>
        </div>
      )}

      {mode === 'results' && (
        <motion.div
          className="quiz-results"
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="quiz-result-sticker" aria-hidden="true">🏆</span>
          <p className="handwritten quiz-final-score">
            {score} <span>of</span> {questions.length}
          </p>
          <h2 className="handwritten">Your birthday quiz score</h2>
          <p>{resultMessage}</p>
          <div className="quiz-footer">
            <button type="button" className="scrapbook-back-button" onClick={onExit}>
              BACK TO THE BIRTHDAY CARD
            </button>
            <button type="button" className="scrapbook-button handwritten" onClick={startGame}>
              PLAY AGAIN ↻
            </button>
          </div>
        </motion.div>
      )}
    </motion.section>
  )
}
