import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'
import { Card } from '../Card'

export function SimpleFlashcard() {
  const [isFront, setIsFront] = useState(true)
  if (isFront) {
    return (
      <Card className="borer rounded-lg border-red-500 md:col-span-3">
        <Card.Title>What&apos;s the questions?</Card.Title>
        <ArrowUturnRightIcon
          className="h-6"
          onClick={() => setIsFront(false)}
        />
      </Card>
    )
  }
  return (
    <Card className="md:col-span-3">
      <Card.Title>What&apos;s the answer?</Card.Title>
      <ArrowUturnLeftIcon className="h-6" onClick={() => setIsFront(true)} />
      front flashcard 2
    </Card>
  )
}
