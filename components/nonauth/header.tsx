import Link from "next/link"
import { Button } from "@/components/ui/button"
import { instrumentSans } from "@/lib/fonts"

export function Header() {
  return (
    <header className="w-full">
      <div className="px-4 py-2 flex items-center justify-between w-full">
        <Link href="/">
          <h1 className="text-xl font-bold" style={{ fontFamily: instrumentSans.style.fontFamily }}>Voidnet</h1>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
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
      </div>
    </header>
  )
}
