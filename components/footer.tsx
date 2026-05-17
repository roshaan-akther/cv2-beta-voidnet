import Link from "next/link"
import { helveticaNeue } from "@/lib/fonts"

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/voidai" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  VoidAI
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/legal/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/legal/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="/mcp" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  MCP Protocol
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Connect</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/status" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  System Status
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <h1 
              className="text-lg font-bold tracking-tight" 
              style={{ fontFamily: helveticaNeue.style.fontFamily }}
            >
              Voidnet
            </h1>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Voidnet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
