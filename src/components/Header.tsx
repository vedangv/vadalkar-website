"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/banner.gif"
              alt="Vadalkar And Associates - Structural & Civil Engineering Consultant"
              width={280}
              height={43}
              className={`h-10 w-auto sm:h-12 transition-all duration-300 ${
                scrolled ? "" : "brightness-0 invert"
              }`}
              unoptimized
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled
                    ? "text-slate-600 hover:text-primary-500"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                scrolled
                  ? "bg-primary-500 text-white hover:bg-primary-600"
                  : "bg-white/10 text-white border border-white/30 hover:bg-white/20 backdrop-blur-sm"
              }`}
            >
              Get in Touch
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${scrolled ? "text-slate-600" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <nav className="px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-slate-600 hover:text-primary-500 py-2"
                onClick={() => setMobileOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="block bg-primary-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-primary-600 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Get in Touch
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
