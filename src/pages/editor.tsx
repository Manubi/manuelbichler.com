import { MilkdownEditor } from '@/components/Editor'
import { SimpleLayout } from '@/components/SimpleLayout'
import { MilkdownProvider } from '@milkdown/react'
import Head from 'next/head'

export default function Editor() {
  return (
    <>
      <Head>
        <title>Questions and Answers - Manuel Bichler</title>
        <meta
          name="description"
          content="Add questions and answers to your deck."
        />
      </Head>
      <SimpleLayout
        title="Add cards"
        intro="Add questions and answers to your deck."
      >
        <div className="space-y-20">
          <MilkdownProvider>
            <MilkdownEditor />
          </MilkdownProvider>
        </div>
      </SimpleLayout>
    </>
  )
}
