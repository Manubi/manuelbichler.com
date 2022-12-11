import clsx from 'clsx'
import { forwardRef } from 'react'

type TContainerProps = {
  className?: string
  children: React.ReactNode
  style?: React.CSSProperties
}

type RefType = HTMLDivElement

export const OuterContainer = forwardRef<RefType, TContainerProps>(
  function OuterContainer({ className, children, ...props }, ref) {
    return (
      <div ref={ref} className={clsx('sm:px-8', className)} {...props}>
        <div className="mx-auto max-w-7xl lg:px-8">{children}</div>
      </div>
    )
  }
)

export const InnerContainer = forwardRef<RefType, TContainerProps>(
  function InnerContainer({ className, children, ...props }, ref) {
    return (
      <div
        ref={ref}
        className={clsx('relative px-4 sm:px-8 lg:px-12', className)}
        {...props}
      >
        <div className="max-w-2xl mx-auto lg:max-w-5xl">{children}</div>
      </div>
    )
  }
)

export const Container = forwardRef<RefType, TContainerProps>(
  function Container({ children, ...props }, ref) {
    return (
      <OuterContainer ref={ref} {...props}>
        <InnerContainer>{children}</InnerContainer>
      </OuterContainer>
    )
  }
)
