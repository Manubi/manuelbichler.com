import {
  defaultValueCtx,
  Editor,
  editorViewOptionsCtx,
  rootCtx,
} from '@milkdown/core'

import { prism } from '@milkdown/plugin-prism'
import { commonmark } from '@milkdown/preset-commonmark'
import { Milkdown, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'

import '@milkdown/theme-nord/style.css'

type TProps = {
  markdown: string
}
export function MilkdownViewer({ markdown }: TProps) {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
        ctx.update(editorViewOptionsCtx, (prev) => ({
          ...prev,
          attributes: {
            class:
              'milkdown-editor outline-none min-w-0 flex-auto appearance-none  bg-white px-3 py-[calc(theme(spacing.2)-1px)]  dark:bg-zinc-700/[0.15] dark:text-zinc-200  sm:text-sm',
            spellcheck: 'false',
          },
        }))
      })
      .config(nord)
      .use(commonmark)
      .use(prism)
  }, [])

  return <Milkdown />
}
