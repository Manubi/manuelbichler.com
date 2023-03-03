import glob from 'fast-glob'
import * as path from 'path'

async function importArticle(articleFilename: string) {
  let { meta, default: component } = await import(
    `../pages/articles/${articleFilename}`
  )
  return {
    slug: articleFilename.replace(/(\/index)?\.mdx$/, ''),
    ...meta,
    component,
  }
}

export async function getAllArticles() {
  let articleFilenames = await glob(['*.mdx', '*/index.mdx', '!**/drafts/**'], {
    cwd: path.join(process.cwd(), 'src/pages/articles'),
  })

  let articles = await Promise.all(articleFilenames.map(importArticle))

  return articles.sort((a: { date: string }, z: { date: string }) => {
    return new Date(z.date).getTime() - new Date(a.date).getTime()
  })
}
