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
import { Mail, MapPin, MessageSquare } from "lucide-react";
import { StarEffect } from "@/dump/star-effect";

export default function ContactPage() {
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
                  Get in touch
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section>
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-8">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Email</h3>
                      <p className="text-muted-foreground">roshaan@openvoidnet.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Address</h3>
                      <p className="text-muted-foreground">1441 Gardiner Lane, Louisville, KY 40213</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MessageSquare className="w-5 h-5 mt-1 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium mb-1">Support</h3>
                      <p className="text-muted-foreground">Available 24/7 for all customers with near realtime</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="space-y-6" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Nikola Tesla" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="nikola@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us more about your inquiry..." 
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <Button size="default" type="submit">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section>
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6">Ready to get started?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Explore our platform and discover how Voidnet can help you build the future of the agentic web.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/feedback">Send Feedback</Link>
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
