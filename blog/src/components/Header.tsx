'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SearchModal from '@/components/SearchModal'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/categories', label: 'Categories' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  // Track scroll for subtle header background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cmd/Ctrl+K keyboard shortcut to toggle search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`
        sticky top-0 z-50
        transition-all duration-500 ease-out
        ${scrolled
          ? 'bg-[var(--color-background)]/95 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]'
          : 'bg-[var(--color-background)]'
        }
      `}
    >
      <nav className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Blog Name */}
          <Link
            href="/"
            className="group relative"
            onClick={() => setMobileMenuOpen(false)}
          >
            <span
              className="
                font-[var(--font-playfair-display)] text-2xl md:text-[1.7rem] font-bold
                tracking-tight text-[var(--color-primary)]
                transition-colors duration-300
                group-hover:text-[var(--color-accent)]
              "
              style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
            >
              Reflections
            </span>
            <span
              className="
                absolute -bottom-1 left-0 w-0 h-[2px]
                bg-[var(--color-accent)]
                transition-all duration-300 ease-out
                group-hover:w-full
              "
            />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="
                    relative px-4 py-2
                    text-[0.8rem] font-semibold tracking-[0.15em] uppercase
                    text-[var(--color-muted)]
                    transition-colors duration-300
                    hover:text-[var(--color-primary)]
                  "
                >
                  <span className="relative">
                    {label}
                    <span
                      className="
                        absolute -bottom-1 left-0 w-0 h-[1.5px]
                        bg-[var(--color-accent)]
                        transition-all duration-300 ease-out
                      "
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Search Button */}
          <button
            type="button"
            className="
              hidden md:flex items-center justify-center
              w-9 h-9 rounded-lg
              text-[var(--color-muted)]
              hover:text-[var(--color-primary)]
              hover:bg-[var(--color-surface)]
              transition-colors duration-200
              ml-2
            "
            onClick={() => setSearchOpen(true)}
            aria-label="Search posts (Cmd+K)"
            title="Search (Cmd+K)"
          >
            <svg
              className="w-[18px] h-[18px]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="
              md:hidden relative z-50
              w-10 h-10 flex items-center justify-center
              text-[var(--color-primary)]
              focus:outline-none
            "
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`
                  block h-[1.5px] w-6 bg-current rounded-full
                  transition-all duration-300 ease-out origin-center
                  ${mobileMenuOpen ? 'translate-y-[9px] rotate-45' : ''}
                `}
              />
              <span
                className={`
                  block h-[1.5px] w-6 bg-current rounded-full
                  transition-all duration-300 ease-out
                  ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}
                `}
              />
              <span
                className={`
                  block h-[1.5px] w-6 bg-current rounded-full
                  transition-all duration-300 ease-out origin-center
                  ${mobileMenuOpen ? '-translate-y-[9px] -rotate-45' : ''}
                `}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`
          md:hidden fixed inset-0 z-40
          bg-[var(--color-background)]
          transition-all duration-500 ease-out
          ${mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
          }
        `}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav>
            <ul className="flex flex-col items-center gap-2">
              {navLinks.map(({ href, label }, index) => (
                <li
                  key={href}
                  className={`
                    transition-all duration-500 ease-out
                    ${mobileMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                    }
                  `}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${150 + index * 75}ms` : '0ms',
                  }}
                >
                  <Link
                    href={href}
                    className="
                      block px-6 py-4
                      text-3xl font-bold tracking-tight
                      text-[var(--color-primary)]
                      hover:text-[var(--color-accent)]
                      transition-colors duration-300
                    "
                    style={{ fontFamily: 'var(--font-playfair-display), Georgia, serif' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Search Button */}
          <button
            type="button"
            className={`
              mt-8 flex items-center gap-3
              px-6 py-3
              text-lg
              text-[var(--color-muted)]
              hover:text-[var(--color-accent)]
              transition-all duration-500 ease-out
              ${mobileMenuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4'
              }
            `}
            style={{
              transitionDelay: mobileMenuOpen ? `${150 + navLinks.length * 75}ms` : '0ms',
            }}
            onClick={() => {
              setMobileMenuOpen(false)
              setSearchOpen(true)
            }}
            aria-label="Search posts"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            Search
          </button>

          {/* Decorative element in mobile menu */}
          <div
            className={`
              mt-12 w-12 h-[1.5px] bg-[var(--color-accent)]
              transition-all duration-700 ease-out
              ${mobileMenuOpen ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
            `}
            style={{ transitionDelay: mobileMenuOpen ? '400ms' : '0ms' }}
          />
        </div>
      </div>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  )
}
