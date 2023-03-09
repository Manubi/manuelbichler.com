import { useRouter } from 'next/router'

import { Container } from '@/components/Container'

import { useEffect, useRef } from 'react'
import { AvatarContainer } from './AvatarContainer'
import { DarkmodeToggle } from './DarkmodeToggle'
import { DesktopNavigation } from './DesktopNavigation'
import { MobileNavigation } from './MobileNavigation'
import { MyAvatar } from './MyAvatar'
import { ProfileButton } from './ProfileButton'

function clamp(number, a, b) {
  let min = Math.min(a, b)
  let max = Math.max(a, b)
  return Math.min(Math.max(number, min), max)
}

export function Header() {
  let isHomePage = useRouter().pathname === '/'

  let headerRef = useRef<HTMLDivElement>()
  let avatarRef = useRef<HTMLDivElement>()
  let isInitial = useRef(true)

  useEffect(() => {
    let downDelay = avatarRef.current?.offsetTop ?? 0
    let upDelay = 64

    function setProperty(property, value) {
      document.documentElement.style.setProperty(property, value)
    }

    function removeProperty(property) {
      document.documentElement.style.removeProperty(property)
    }

    function updateHeaderStyles() {
      let { top, height } = headerRef?.current?.getBoundingClientRect() as any
      let scrollY = clamp(
        window.scrollY,
        0,
        document.body.scrollHeight - window.innerHeight
      )

      if (isInitial.current) {
        setProperty('--header-position', 'sticky')
      }

      setProperty('--content-offset', `${downDelay}px`)

      if (isInitial.current || scrollY < downDelay) {
        setProperty('--header-height', `${downDelay + height}px`)
        setProperty('--header-mb', `${-downDelay}px`)
      } else if (top + height < -upDelay) {
        let offset = Math.max(height, scrollY - upDelay)
        setProperty('--header-height', `${offset}px`)
        setProperty('--header-mb', `${height - offset}px`)
      } else if (top === 0) {
        setProperty('--header-height', `${scrollY + height}px`)
        setProperty('--header-mb', `${-scrollY}px`)
      }

      if (top === 0 && scrollY > 0 && scrollY >= downDelay) {
        setProperty('--header-inner-position', 'fixed')
        removeProperty('--header-top')
        removeProperty('--avatar-top')
      } else {
        removeProperty('--header-inner-position')
        setProperty('--header-top', '0px')
        setProperty('--avatar-top', '0px')
      }
    }

    function updateAvatarStyles() {
      if (!isHomePage) {
        return
      }

      let fromScale = 1
      let toScale = 36 / 64
      let fromX = 0
      let toX = 2 / 16

      let scrollY = downDelay - window.scrollY

      let scale = (scrollY * (fromScale - toScale)) / downDelay + toScale
      scale = clamp(scale, fromScale, toScale)

      let x = (scrollY * (fromX - toX)) / downDelay + toX
      x = clamp(x, fromX, toX)

      setProperty(
        '--avatar-image-transform',
        `translate3d(${x}rem, 0, 0) scale(${scale})`
      )

      let borderScale = 1 / (toScale / scale)
      let borderX = (-toX + x) * borderScale
      let borderTransform = `translate3d(${borderX}rem, 0, 0) scale(${borderScale})`

      setProperty('--avatar-border-transform', borderTransform)
      setProperty('--avatar-border-opacity', scale === toScale ? 1 : 0)
    }

    function updateStyles() {
      updateHeaderStyles()
      updateAvatarStyles()
      isInitial.current = false
    }

    updateStyles()
    window.addEventListener('scroll', updateStyles, { passive: true })
    window.addEventListener('resize', updateStyles)

    return () => {
      window.removeEventListener('scroll', updateStyles, {
        passive: true,
      } as any)
      window.removeEventListener('resize', updateStyles)
    }
  }, [isHomePage])

  return (
    <>
      <header
        className="relative z-50 flex flex-col pointer-events-none"
        style={{
          height: 'var(--header-height)',
          marginBottom: 'var(--header-mb)',
        }}
      >
        {isHomePage && (
          <>
            <div
              ref={avatarRef as any}
              className="order-last mt-[calc(theme(spacing.16)-theme(spacing.3))]"
            />
            <Container
              className="top-0 order-last pt-3 -mb-3"
              style={{
                position: 'var(--header-position)' as any,
              }}
            >
              <div
                className="top-[var(--avatar-top,theme(spacing.3))] w-full"
                style={{ position: 'var(--header-inner-position)' } as any}
              >
                <div className="relative">
                  <AvatarContainer
                    className="absolute left-0 transition-opacity origin-left top-3"
                    style={
                      {
                        opacity: 'var(--avatar-border-opacity, 0)',
                        transform: 'var(--avatar-border-transform)',
                      } as any
                    }
                  />
                  <MyAvatar
                    large
                    className="block w-16 h-16 origin-left"
                    style={
                      { transform: 'var(--avatar-image-transform)' } as any
                    }
                  />
                </div>
              </div>
            </Container>
          </>
        )}
        <div
          ref={headerRef as any}
          className="top-0 z-10 h-16 pt-6"
          style={{ position: 'var(--header-position)' } as any}
        >
          <Container
            className="top-[var(--header-top,theme(spacing.6))] w-full"
            style={{ position: 'var(--header-inner-position)' } as any}
          >
            <div className="relative flex gap-4">
              <div className="flex flex-1">
                {!isHomePage && (
                  <AvatarContainer>
                    <MyAvatar />
                  </AvatarContainer>
                )}
              </div>
              <div className="flex justify-end flex-1 md:justify-center">
                <MobileNavigation className="pointer-events-auto md:hidden" />
                <DesktopNavigation className="hidden pointer-events-auto md:block" />
              </div>
              <div className="flex justify-end md:flex-1">
                <div className="flex mr-6 align-middle pointer-events-auto">
                  <ProfileButton />
                </div>
                <div className="pointer-events-auto">
                  <DarkmodeToggle />
                </div>
              </div>
            </div>
          </Container>
        </div>
      </header>
      {isHomePage && <div style={{ height: 'var(--content-offset)' }} />}
    </>
  )
}
