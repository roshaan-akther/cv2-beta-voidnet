"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import Link from 'next/link';
import { helveticaNeue } from "@/lib/fonts";

export default function LegalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/userinfo')
        setIsAuthenticated(response.ok)
      } catch (error) {
        setIsAuthenticated(false)
      }
    }
    checkAuth()
  }, [])

  const legalDocs = [
    {
      title: "Privacy Policy",
      description: "How Voidnet handles your data and protects your privacy.",
      slug: "privacy-policy",
      date: "December 4, 2025"
    },
    {
      title: "Terms of Service",
      description: "The rules and conditions for using Voidnet.",
      slug: "terms-of-service",
      date: "December 4, 2025"
    }
  ]

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 
            className="text-3xl sm:text-4xl font-medium tracking-tight mb-4"
            style={{ fontFamily: helveticaNeue.style.fontFamily }}
          >
            Legal
          </h1>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl">
            Our legal documents that govern your use of Voidnet.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {legalDocs.map((doc) => (
              <Link 
                key={doc.slug} 
                href={`/legal/${doc.slug}`}
                className="group"
              >
                <article className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <time dateTime={doc.date}>{doc.date}</time>
                  </div>
                  
                  <h2 className="text-xl font-medium mb-2 group-hover:underline decoration-1 underline-offset-4">
                    {doc.title}
                  </h2>
                  
                  <p className="text-sm text-muted-foreground">
                    {doc.description}
                  </p>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
