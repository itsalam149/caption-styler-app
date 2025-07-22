"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sparkles, Menu, X } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 glass-sky border-b border-sky-200/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Sparkles className="h-8 w-8 text-sky-600 group-hover:text-sky-700 transition-colors animate-pulse-glow" />
            <div className="absolute inset-0 h-8 w-8 bg-sky-400 rounded-full opacity-20 animate-ping"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-sky bg-clip-text text-transparent">CaptionCraft</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-sky-700 hover:text-sky-900 transition-colors font-medium relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/upload" className="text-sky-700 hover:text-sky-900 transition-colors font-medium relative group">
            Upload
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/editor" className="text-sky-700 hover:text-sky-900 transition-colors font-medium relative group">
            Editor
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-600 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button className="btn-sky" asChild>
            <Link href="/upload">Get Started</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden text-sky-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden glass-sky border-t border-sky-200/50 animate-slide-in">
          <nav className="container mx-auto px-4 py-4 space-y-4">
            <Link
              href="/"
              className="block text-sky-700 hover:text-sky-900 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/upload"
              className="block text-sky-700 hover:text-sky-900 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              href="/editor"
              className="block text-sky-700 hover:text-sky-900 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Editor
            </Link>
            <Button className="btn-sky w-full" asChild>
              <Link href="/upload" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
