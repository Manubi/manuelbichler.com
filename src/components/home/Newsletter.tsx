import { Button } from '@/components/Button'
import { MailOutlineIcon } from '@/components/icons/MailIcon'
import { Input } from '@/components/Input'
import { routes } from '@/utils/routes'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export function Newsletter() {
  const { register, handleSubmit, reset } = useForm()
  const [error, setError] = useState('')
  const router = useRouter()
  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        reset()
        router.push(routes.public.thankYou.path)
      } else {
        setError(data.error)
      }
    } catch (error) {
      setError(error.message)
    }
  })
  return (
    <form
      onSubmit={onSubmit}
      className="p-6 border rounded-2xl border-zinc-100 dark:border-zinc-700/40"
    >
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <MailOutlineIcon className="flex-none w-6 h-6" />
        <span className="ml-3">Stay up to date</span>
      </h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Get notified when I publish something new, and unsubscribe at any time.
      </p>
      <div className="flex mt-6">
        <Input
          {...register('email')}
          type="email"
          autoFocus={false}
          placeholder="Email address"
          aria-label="Email address"
          required
        />

        <Button type="submit" className="flex-none my-4 ml-4">
          Join
        </Button>
      </div>
      {error && (
        <p className="text-sm leading-none text-red-500">
          An error occurred: {error}
        </p>
      )}
    </form>
  )
}
