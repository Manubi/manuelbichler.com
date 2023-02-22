import glob from 'fast-glob'
import * as path from 'path'

async function importSnippet(snippetFilename) {
  let { meta, default: component } = await import(
    `../pages/snippets/${snippetFilename}`
  )
  return {
    slug: snippetFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllSnippets() {
  let snippetsFilenames = await glob(['*.mdx', '*/index.mdx'], {
    cwd: path.join(process.cwd(), 'src/pages/snippets'),
  })

  let snippets = await Promise.all(snippetsFilenames.map(importSnippet))

  return snippets.sort((a, z) => new Date(z.date) - new Date(a.date))
}
