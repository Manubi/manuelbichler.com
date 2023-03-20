import { Button } from '@/components/Button'
import { AddCategory } from '@/components/flashcards/AddCategory'
import { AddDeck } from '@/components/flashcards/AddDeck'
import { Input } from '@/components/Input'
import { ListboxSelect } from '@/components/Listbox'
import { MilkdownEditor } from '@/components/MarkdownEditor'
import { Notification } from '@/components/Notification'

import { SimpleLayout } from '@/components/SimpleLayout'
import { trpc } from '@/utils/trpc'
import { useAuth } from '@clerk/nextjs'
import { BoltIcon } from '@heroicons/react/24/outline'
import { MilkdownProvider } from '@milkdown/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

export default function AddFlashcard() {
  const { isLoaded, userId, sessionId, getToken } = useAuth()
  const [selectedDeckId, setSelectedDeckId] = useState<number>(0)
  const [markdown, setMarkdown] = useState<string>('answer')
  const [showAddDeck, setShowAddDeck] = useState(false)
  const [showAddCategory, setShowAddCategory] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: '',
      answer: '',
      checkboxes: [], // register checkbox will be determine as array of checkboxes
    },
  })
  const deckQuery = trpc.deck.list.useQuery()
  const decks = deckQuery.data?.decks
  const categories = trpc.category.list.useQuery()

  const { isLoading, mutate: addFlashcard } = trpc.flashcard.add.useMutation({
    onSuccess(data) {
      toast.custom((t) => (
        <Notification
          title="All good!"
          subtitle={`Flashcard added successfully.`}
          type="success"
          t={t}
        />
      ))
    },
    onError(error) {
      toast.custom((t) => (
        <Notification
          title="Ohhh nooo!"
          subtitle={`Error: ${error.message}`}
          type="error"
          t={t}
        />
      ))
    },
  })

  const onSubmit = handleSubmit(
    (data: { question: string; answer: string; checkboxes: string[] }) => {
      const { checkboxes, question } = data
      const formData = {
        deckId: selectedDeckId,
        question: question,
        category: checkboxes.map((stringNumber) => Number(stringNumber)),
        answer: markdown,
      }
      addFlashcard(formData)
      setMarkdown('answer')
      reset()
    }
  )

  // In case the user signs out while on the page.
  if (!isLoaded || !userId) {
    return null
  }

  return (
    <SimpleLayout title="Add flashcard" intro="">
      <div className="mt-8 space-y-20">
        {showAddDeck && <AddDeck setShowAddDeck={setShowAddDeck} />}
        {showAddCategory && (
          <AddCategory setShowAddCategory={setShowAddCategory} />
        )}
        <div>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="h-6 w-6 flex-none" />
              <span className="ml-3">Add new flashcard</span>
            </h2>
            <div className="flex flex-col gap-3 ">
              <div className="flex space-x-6">
                <div className="flex space-x-6">
                  <div className="w-72">
                    {decks && (
                      <ListboxSelect
                        decks={decks}
                        setSelectedId={setSelectedDeckId}
                      />
                    )}{' '}
                  </div>
                  {!showAddDeck && (
                    <Button
                      variant="secondary"
                      className="my-4 max-h-10"
                      onClick={() => setShowAddDeck(!showAddDeck)}
                    >
                      {!showAddDeck ? 'Add deck' : 'close'}
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                  Categories
                </h3>
                {categories?.data?.category.map((category, categoryIdx) => (
                  <div
                    key={categoryIdx + category.name}
                    className="relative flex items-start py-2"
                  >
                    <div className="min-w-0 flex-1 text-sm">
                      <label
                        htmlFor={`category-${category.name}`}
                        className="select-none font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        {category.name}
                      </label>
                    </div>
                    <div className="ml-3 flex h-5 items-center">
                      <Input
                        {...register('checkboxes')}
                        name="checkboxes"
                        type="checkbox"
                        value={category.id}
                        className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500 "
                      />
                    </div>
                  </div>
                ))}
                {!showAddCategory && (
                  <div className="flex justify-end ">
                    <Button
                      variant="secondary"
                      className="max-h-10"
                      onClick={() => setShowAddCategory(!showAddCategory)}
                    >
                      {!showAddCategory ? 'Add category' : 'close'}
                    </Button>
                  </div>
                )}
              </div>

              <input
                {...register('question')}
                type="text"
                placeholder="question"
                required
                className="my-4 w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
              />
              <MilkdownProvider>
                <MilkdownEditor setMarkdown={setMarkdown} markdown={markdown} />
              </MilkdownProvider>

              <Button type="submit" className="flex-none ">
                Add flashcard
              </Button>
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
