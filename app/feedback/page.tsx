"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { helveticaNeue } from "@/lib/fonts";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { StarEffect } from "@/dump/star-effect";

export default function FeedbackPage() {
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
          <StarEffect />
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="py-20 sm:py-32 lg:py-40">
              <div className="max-w-2xl mx-auto text-center">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
                  style={{ fontFamily: helveticaNeue.style.fontFamily }}
                >
                  Share your feedback
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                  Help us improve Voidnet by sharing your thoughts, suggestions, and experiences.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section>
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-2xl mx-auto" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Ada Lovelace" className="max-w-md" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="ada@example.com" className="max-w-md" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Feedback Type</Label>
                  <select 
                    id="type" 
                    className="w-full max-w-md px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select type...</option>
                    <option value="bug">Bug Report</option>
                    <option value="feature">Feature Request</option>
                    <option value="improvement">Improvement</option>
                    <option value="documentation">Documentation Issue</option>
                    <option value="other">Other</option>
                    <option value="general">General Feedback</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us what you think..." 
                    className="min-h-[150px]"
                  />
                </div>
                
                <Button size="lg" type="submit">
                  Submit Feedback
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section>
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Other ways to reach us</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Prefer to connect differently? Check out our other channels.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/docs">Documentation</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
