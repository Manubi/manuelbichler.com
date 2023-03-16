import { cn } from '@/utils/cn'
import React from 'react'

const Input = React.forwardRef<
  HTMLInputElement,
  {
    className?: string
    id?: string
    name?: string
    required?: boolean
    type?: string
    value?: string | number | readonly string[]
    placeholder?: string
    helperText?: string
    errorText?: string
    onPaste?: React.ClipboardEventHandler<HTMLInputElement>
    autoFocus?: boolean
  }
>(
  (
    {
      autoFocus = true,
      helperText,
      id,
      name,
      type,
      required,
      errorText,
      onPaste,
      placeholder,
      className,
      value,
      ...rest
    },
    ref
  ) => {
    return (
      <>
        {helperText && <span className="">{helperText}</span>}
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          autoFocus={autoFocus}
          onPaste={onPaste}
          value={value}
          className={cn(
            className,
            'my-4 min-w-0 flex-auto appearance-none rounded-md border border-zinc-900/10 bg-white px-3 py-[calc(theme(spacing.2)-1px)] shadow-md shadow-zinc-800/5 placeholder:text-zinc-400 focus:border-teal-500 focus:outline-none focus:ring-4 focus:ring-teal-500/10 dark:border-zinc-700 dark:bg-zinc-700/[0.15] dark:text-zinc-200 dark:placeholder:text-zinc-500 dark:focus:border-teal-400 dark:focus:ring-teal-400/10 sm:text-sm'
          )}
          ref={ref}
          {...rest}
        />
        {errorText && <span className="">{errorText}</span>}
      </>
    )
  }
)

Input.displayName = 'Input'

export { Input }
