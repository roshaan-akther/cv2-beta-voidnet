"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { instrumentSans } from "@/lib/fonts"
import { Menu } from "lucide-react"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      <div className="px-4 py-2 flex items-center justify-between w-full">
        <Link href="/">
          <h1 className="text-xl font-bold" style={{ fontFamily: instrumentSans.style.fontFamily }}>Voidnet</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/marketplace">Marketplace</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={process.env.NEXT_PUBLIC_VOIDDOCS_URL || "/docs"} target="_blank" rel="noopener noreferrer">Documentation</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/learn">Learn voidnet</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={process.env.NEXT_PUBLIC_VOIDAI_URL || "/voidai"} target="_blank" rel="noopener noreferrer">VoidAI</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href={process.env.NEXT_PUBLIC_STATUS_URL || "/status"} target="_blank" rel="noopener noreferrer">Status</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/billing">How billing work</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/about">About</Link>
          </Button>
          <Button asChild>
            <Link href={process.env.NEXT_PUBLIC_AUTH_URL || "/auth"}>Sign in to Account</Link>
          </Button>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Button asChild size="sm">
            <Link href={process.env.NEXT_PUBLIC_AUTH_URL || "/auth"}>Sign in</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <nav className="md:hidden px-4 py-4 flex flex-col gap-1 border-t bg-background animate-in fade-in slide-in-from-top-2 duration-200">
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href="/marketplace">Marketplace</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href={process.env.NEXT_PUBLIC_VOIDDOCS_URL || "/docs"} target="_blank" rel="noopener noreferrer">Documentation</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href="/learn">Learn voidnet</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href={process.env.NEXT_PUBLIC_VOIDAI_URL || "/voidai"} target="_blank" rel="noopener noreferrer">VoidAI</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href={process.env.NEXT_PUBLIC_STATUS_URL || "/status"} target="_blank" rel="noopener noreferrer">Status</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href="/billing">How billing work</Link>
          </Button>
          <Button variant="ghost" asChild className="justify-start h-12">
            <Link href="/about">About</Link>
          </Button>
        </nav>
      )}
    </header>
  )
}
