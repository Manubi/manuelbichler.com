import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { MilkdownProvider } from '@milkdown/react'
import { useState } from 'react'
import { Card } from '../Card'
import { MilkdownViewer } from '../MarkdownViewer'

export function SimpleFlashcard({ flashcards }) {
  const [isFront, setIsFront] = useState(true)
  const [index, setIndex] = useState(0)
  const handlePrev = () => {
    setIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : flashcards.length - 1
    )
  }

  const handleNext = () => {
    setIndex((prevIndex) =>
      prevIndex < flashcards.length - 1 ? prevIndex + 1 : 0
    )
  }

  return (
    <div className="relative flex w-full justify-between rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700/40 md:p-6">
      <div className="absolute top-1 right-2 text-xs font-semibold tracking-wider text-zinc-400 md:top-4 md:right-4 md:text-sm">
        {index + 1}/{flashcards.length}
      </div>
      <button className="md:m-6" onClick={handlePrev}>
        <ChevronLeftIcon className="h-10 w-10 font-bold text-zinc-400" />
      </button>
      <div
        className="my-auto w-full cursor-pointer text-center"
        onClick={() => setIsFront(!isFront)}
      >
        {isFront ? (
          <Card.Title>{flashcards[index].question}</Card.Title>
        ) : (
          // <Card.Title> {flashcards[index].answer}</Card.Title>
          <MilkdownProvider>
            <MilkdownViewer markdown={flashcards[index].answer} />
          </MilkdownProvider>
        )}
      </div>
      <button className="md:m-6" onClick={handleNext}>
        <ChevronRightIcon className="h-10 w-10 font-bold text-zinc-400" />
      </button>
    </div>
  )
}
