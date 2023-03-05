import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
} from '@milkdown/core'

import { history } from '@milkdown/plugin-history'
import { listener, listenerCtx } from '@milkdown/plugin-listener'
import { prism } from '@milkdown/plugin-prism'
import { commonmark } from '@milkdown/preset-commonmark'
import { Milkdown, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'

import '@milkdown/theme-nord/style.css'

type TProps = {
  markdown: string
  setMarkdown: (markdown: string) => void
}
export function MilkdownEditor({ setMarkdown, markdown }: TProps) {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)

        ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
          setMarkdown(markdown)
          console.log(markdown)
        })
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class:
              'milkdown-editor outline-none w-full my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm',
            spellcheck: 'false',
          },
        }))
      })
      .config(nord)
      .use(commonmark)
      .use(history)
      .use(listener)
      .use(prism)
  }, [])

  return <Milkdown />
}
