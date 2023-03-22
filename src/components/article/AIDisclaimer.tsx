import { Info } from 'lucide-react'

export function AIDisclaimer() {
  return (
    <div className="relative my-8 flex w-full justify-between rounded-2xl border border-zinc-200 p-3 dark:border-zinc-700/40 dark:bg-zinc-800 md:p-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-teal-500" aria-hidden="true" />
        </div>
        <div className="ml-3 dark:text-white">
          <h3 className="text-sm font-medium">AI Authorship Disclaimer</h3>
          <div className="mt-2 text-sm text-zinc-400 dark:text-zinc-400">
            <p>
              Please note that the contents of this article have been enhanced
              by an Artificial Intelligence (AI) language model. While the AI
              strives to provide accurate and coherent information, it may
              contain inaccuracies, inconsistencies, or grammatical errors. More
              about my workflow.
            </p>
          </div>
        </div>
        {/* <div className="pl-3 ml-auto">
          <div className="-mx-2.5 -my-3.5">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="inline-flex rounded-md text-zinc-400 hover:text-teal-400 focus:outline-none dark:text-zinc-500 hover:dark:text-teal-400"
            >
              <span className="sr-only">Dismiss</span>
              <XCircleIcon
                strokeWidth={1.5}
                className="w-5 h-5"
                aria-hidden="true"
              />
            </button>
          </div>
        </div> */}
      </div>
    </div>
  )
}
