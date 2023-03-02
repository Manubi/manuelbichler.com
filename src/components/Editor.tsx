import { defaultValueCtx, Editor, rootCtx } from '@milkdown/core'
import type { FC } from 'react'

import { history } from '@milkdown/plugin-history'
import { commonmark } from '@milkdown/preset-commonmark'
import { Milkdown, useEditor } from '@milkdown/react'
import { nord } from '@milkdown/theme-nord'

import '@milkdown/theme-nord/style.css'

const markdown = `# write yor answer in

> some fancy markdown
`

export const MilkdownEditor: FC = () => {
  useEditor((root) => {
    return Editor.make()
      .config((ctx) => {
        ctx.set(rootCtx, root)
        ctx.set(defaultValueCtx, markdown)
      })
      .config(nord)
      .use(commonmark)
      .use(history)
  }, [])

  return <Milkdown />
}
