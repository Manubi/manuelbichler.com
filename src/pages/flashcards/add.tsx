import { Button } from '@/components/Button'
import { MilkdownEditor } from '@/components/Editor'
import { AddDeck } from '@/components/flashCards/AddDeck'
import { ListboxSelect } from '@/components/Listbox'

import { SimpleLayout } from '@/components/SimpleLayout'
import { getEnumValues } from '@/utils/getEnumValues'
import { trpc } from '@/utils/trpc'
import { BoltIcon } from '@heroicons/react/24/outline'
import { MilkdownProvider } from '@milkdown/react'
import { FlashcardCategories } from '@prisma/client'
import { useQueryClient } from '@tanstack/react-query'
import { getQueryKey } from '@trpc/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function AddFlashcard() {
  const [selectedDeckId, setSelectedDeckId] = useState<number | undefined>(
    undefined
  )
  const [checkboxItems, setCheckboxItems] = useState<string[]>([])

  const [markdown, setMarkdown] = useState<string>('answer')
  const [showAddDeck, setShowAddDeck] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const queryClient = useQueryClient()
  const flashCardMutation = trpc.flashcard.add.useMutation()
  const deckQuery = trpc.deck.list.useQuery()
  const decks = deckQuery.data?.decks

  const mutation = trpc.flashcard.add.useMutation()
  // manuel todo update the deck data with the response from the deck mutation
  // just used to refetch the deck list every 3 seconds in case a new deck is added
  const deckKey = getQueryKey(trpc.deck.list)
  queryClient.setQueryDefaults(deckKey, { refetchInterval: 3000 })

  const onSubmit = handleSubmit(
    (data: { question: string; answer: string }) => {
      console.log('deckSelected', selectedDeckId)
      console.log('markdown', markdown)
      console.log('checkboxItems', checkboxItems)
      console.log('question', data.question)
      const formData = {
        deckId: selectedDeckId,
        question: data.question,
        category: checkboxItems,
        answer: markdown,
      }
      // mutation.mutate(formData)
    }
  )

  function handleCheckboxChange(event) {
    const value = event.target.value
    if (event.target.checked) {
      setCheckboxItems([...checkboxItems, value])
    } else {
      setCheckboxItems(checkboxItems.filter((item) => item !== value))
    }
  }

  return (
    <SimpleLayout title="Add flashcard" intro="">
      <Button onClick={() => setShowAddDeck(!showAddDeck)}>
        {!showAddDeck ? 'Add deck' : 'close'}
      </Button>
      <div className="mt-8 space-y-20">
        {showAddDeck && <AddDeck />}
        <div>
          <form
            onSubmit={onSubmit}
            className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40"
          >
            <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <BoltIcon className="h-6 w-6 flex-none" />
              <span className="ml-3">Add new flashcard</span>
            </h2>
            <div className="flex flex-col gap-6 ">
              <fieldset>
                <div className="flex space-x-6">
                  <div className="w-72">
                    {decks && (
                      <ListboxSelect
                        decks={decks}
                        setSelectedId={setSelectedDeckId}
                      />
                    )}
                  </div>
                </div>
                <input
                  {...register('question')}
                  type="input"
                  placeholder="question"
                  required
                  className="my-4 w-full min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm"
                />
                {getEnumValues(FlashcardCategories).map(
                  (category, categoryIdx) => (
                    <div
                      key={categoryIdx}
                      className="relative flex items-start py-2"
                    >
                      <div className="min-w-0 flex-1 text-sm">
                        <label
                          htmlFor={`category-${category}`}
                          className="select-none font-medium text-zinc-600 dark:text-zinc-400"
                        >
                          {category as string}
                        </label>
                      </div>
                      <div className="ml-3 flex h-5 items-center">
                        <input
                          id={`category-${category}`}
                          name={`${category}`}
                          checked={checkboxItems.includes(category as string)}
                          onChange={handleCheckboxChange}
                          type="checkbox"
                          value={`${category}`}
                          className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500 "
                        />
                      </div>
                    </div>
                  )
                )}
                <MilkdownProvider>
                  <MilkdownEditor
                    setMarkdown={setMarkdown}
                    markdown={markdown}
                  />
                </MilkdownProvider>
              </fieldset>
              <Button type="submit" className="flex-none ">
                Add flashcard
              </Button>
              {flashCardMutation.error && (
                <p>Something went wrong! {flashCardMutation.error.message}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </SimpleLayout>
  )
}
