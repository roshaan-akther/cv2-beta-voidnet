"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { helveticaNeue } from "@/lib/fonts";
import Link from "next/link";

export default function AboutPage() {
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

  return (
    <div className="min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="py-20 sm:py-32 lg:py-40">
              <div className="max-w-3xl">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
                  style={{ fontFamily: helveticaNeue.style.fontFamily }}
                >
                  Create, code, and innovate with Voidnet's tools and APIs
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl">
                  Building the future of the agentic web with our platform for AI models, tools, and agents.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link href="/marketplace">Get started</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/news">Learn more</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="border-t">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Voidnet is building the execution engine for the agentic web. We enable developers and businesses to publish, discover, and integrate AI models, tools, and agents as interfaces.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform provides the infrastructure for the next generation of AI applications, where agents can seamlessly communicate, collaborate, and compose with each other to solve complex problems.
              </p>
            </div>
          </div>
        </section>

        {/* Infrastructure Flow Section */}
        <section className="border-t">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Our Infrastructure</h2>
              <p className="text-lg text-muted-foreground">
                From building to distribution, our platform handles every step of the AI agent lifecycle.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="border-t">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-3">Innovation</h3>
                <p className="text-muted-foreground">
                  Pushing the boundaries of what's possible with AI and agentic systems.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Accessibility</h3>
                <p className="text-muted-foreground">
                  Making powerful AI tools accessible to everyone, from individuals to enterprises.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-3">Collaboration</h3>
                <p className="text-muted-foreground">
                  Building an ecosystem where developers and AI agents can work together seamlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Join us in building the future</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Whether you're a developer, a business, or an AI enthusiast, there's a place for you in the Voidnet ecosystem.
              </p>
              <Button size="lg" asChild>
                <Link href="/marketplace">Explore Voidnet</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
