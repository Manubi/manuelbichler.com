import { RouterOutput } from '@/utils/trpc'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Fragment, useEffect, useState } from 'react'

type DeckListOutput = RouterOutput['deck']['list']

type ListboxSelectProps = {
  setSelectedId: (id: number) => void
} & DeckListOutput

export function ListboxSelect({ decks, setSelectedId }: ListboxSelectProps) {
  const [selected, setSelected] = useState(decks[0])

  useEffect(() => {
    setSelectedId(selected.id)
  }, [selected.id, setSelectedId])
  return (
    <div className="w-72">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="my-4 flex w-full min-w-0 flex-auto appearance-none justify-between rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm">
            <span className="block truncate">{selected.name}</span>
            <span className="inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <ChevronUpDownIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {decks.map((deck, deckIdx) => (
                <Listbox.Option
                  key={deckIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                    }`
                  }
                  value={deck}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {deck.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
