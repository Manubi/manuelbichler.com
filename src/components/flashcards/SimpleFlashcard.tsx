import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { MilkdownProvider } from '@milkdown/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Card } from '../Card'
import { MilkdownViewer } from '../MarkdownViewer'

export function SimpleFlashcard({ flashcards }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [index, setIndex] = useState(0)
  const handleFlip = () => {
    setIsFlipped((prevIsFlipped) => !prevIsFlipped)
  }

  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    )
    setIsFlipped(false)
  }

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    )
    setIsFlipped(false)
  }

  const variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  }

  return (
    <div className="flex w-full">
      <button className="md:mr-6" onClick={handlePrev}>
        <ChevronLeftIcon className="h-10 w-10 font-bold text-zinc-400" />
      </button>
      <AnimatePresence>
        <motion.div
          key={index}
          className="w-full"
          onClick={handleFlip}
          initial="front"
          animate={isFlipped ? 'back' : 'front'}
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <div className="relative flex w-full justify-between rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700/40 md:p-6">
            <div
              className={`absolute top-0 right-2 text-xs font-semibold tracking-wider text-zinc-400 md:top-4 md:right-4 md:text-sm ${
                isFlipped && 'origin-top scale-x-[-1] transform'
              }`}
            >
              {index + 1}/{flashcards.length}
            </div>
            <div className="my-auto w-full cursor-pointer text-center">
              {!isFlipped ? (
                <Card.Title>{flashcards[index].question}</Card.Title>
              ) : (
                <div className="origin-top scale-x-[-1] transform">
                  <MilkdownProvider>
                    <MilkdownViewer markdown={flashcards[index].answer} />
                  </MilkdownProvider>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button className="md:ml-6" onClick={handleNext}>
        <ChevronRightIcon className="h-10 w-10 font-bold text-zinc-400" />
      </button>
    </div>
  )
}
