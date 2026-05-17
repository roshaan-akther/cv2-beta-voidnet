"use client"

import * as React from "react"
import { Header } from "@/components/nonauth/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { helveticaNeue, geistSans } from "@/lib/fonts"
import Link from "next/link"
import { StarEffect } from "@/dump/star-effect"
import { ArrowRight, CheckCircle2, Info } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function CareersPage() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  React.useEffect(() => {
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

  const benefits = [
    {
      category: "Health & Wellness",
      items: [
        "Comprehensive health, dental, and vision insurance",
        "Mental healthcare support and services",
        "Flexible paid time off"
      ]
    },
    {
      category: "Compensation",
      items: [
        "Competitive salary and equity packages",
        "Retirement plans with company match",
        "Performance bonuses"
      ]
    },
    {
      category: "Life & Family",
      items: [
        "12 weeks paid parental leave",
        "Life and AD&D insurance",
        "Fertility treatment coverage"
      ]
    },
    {
      category: "Culture & Development",
      items: [
        "Annual learning & development stipend",
        "Team-driven celebrations and events",
        "Employee resource groups"
      ]
    }
  ]

  const values = [
    {
      title: "Humanity first",
      description: "We build AI to elevate humanity and benefit people and society through our work.",
      image: "https://public-s3.fuzu.com/blog_images/normal_2d5a174e-4108-4935-a4f5-aedebc300e1c.jpg",
      credit: {
        site: "Fuzu",
        favicon: "https://www.google.com/s2/favicons?domain=fuzu.com&sz=32"
      }
    },
    {
      title: "Act with humility",
      description: "We recognize the limits of our knowledge and remain open to new ideas and perspectives.",
      image: "https://www.imd.org/wp-content/uploads/2025/11/AdobeStock_379910118.jpeg",
      credit: {
        site: "IMD",
        favicon: "https://www.google.com/s2/favicons?domain=imd.org&sz=32"
      }
    },
    {
      title: "Intense focus",
      description: "We're here to make an impact on the world. Clarity and focus enable us to make hard decisions.",
      image: "https://media.istockphoto.com/id/1481370371/photo/portrait-of-enthusiastic-hispanic-young-woman-working-on-computer-in-a-modern-bright-office.jpg",
      credit: {
        site: "iStock",
        favicon: "https://www.google.com/s2/favicons?domain=istockphoto.com&sz=32"
      }
    },
    {
      title: "Update quickly",
      description: "We adapt as we receive new information. Flexibility is key to progress on the path to AGI.",
      image: "https://media.istockphoto.com/id/2172317014/photo/happy-hispanic-man-working-on-laptop-at-home.jpg",
      credit: {
        site: "iStock",
        favicon: "https://www.google.com/s2/favicons?domain=istockphoto.com&sz=32"
      }
    }
  ]

  const hiringSteps = [
    {
      step: "Application",
      description: "Submit your application. We'll review and get back to you within one week or less."
    },
    {
      step: "Interviews",
      description: "Connect with our team through multiple interviews, including technical assessments."
    },
    {
      step: "Offer",
      description: "Receive an offer or update within a week of your final interview."
    }
  ]

  const faqs = [
    {
      question: "Do you offer internships?",
      answer: "Yes, we offer internships and early-career programs for curious, driven individuals."
    },
    {
      question: "Do you sponsor visas?",
      answer: "We can sponsor visas and green cards for eligible candidates when extending an offer."
    },
    {
      question: "Can I re-apply if I'm not selected?",
      answer: "You're welcome to apply again after 12 months, or sooner with significant experience changes."
    },
    {
      question: "What's your remote work policy?",
      answer: "We offer flexible work arrangements based on role and location, with hybrid options available."
    }
  ]

  const [expandedFaq, setExpandedFaq] = React.useState<number | null>(null)

  return (
    <div className="min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <StarEffect />
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="py-20 sm:py-32 lg:py-40">
              <div className="max-w-3xl mx-auto text-center">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] mb-6"
                  style={{ fontFamily: helveticaNeue.style.fontFamily }}
                >
                  Build the agentic future
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  We're looking for curious minds from a wide range of disciplines to help build safe, beneficial agentic AI systems.
                </p>
                <p className="text-sm text-muted-foreground">
                  Check back soon for open positions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-6" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
                Our mission
              </h2>
              <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: geistSans.style.fontFamily }}>
                AI must be advanced with knowledge of and respect for humanity's full spectrum of experiences and perspectives. We build agentic systems that empower people and transform how they interact with technology.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
                Values
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: geistSans.style.fontFamily }}>
                These values define what we consider most important and guide our decision-making.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {values.map((value, index) => (
                <div key={index} className="h-full rounded-lg overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted rounded-lg relative group">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="object-cover w-full h-full rounded-lg"
                    />
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a
                            href={value.image}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <div className="bg-background/80 backdrop-blur-sm rounded-full p-2 cursor-pointer hover:bg-background transition-colors border border-border">
                              <Info className="w-4 h-4" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-background">Credit:</span>
                            <img
                              src={value.credit.favicon}
                              alt=""
                              className="w-4 h-4"
                            />
                            <span className="text-xs">{value.credit.site}</span>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-3" style={{ fontFamily: geistSans.style.fontFamily }}>
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground" style={{ fontFamily: geistSans.style.fontFamily }}>
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Current Jobs Section */}
        <section className="py-16 sm:py-24 bg-muted/30">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
                Current jobs
              </h2>
              <p className="text-lg text-muted-foreground mb-8" style={{ fontFamily: geistSans.style.fontFamily }}>
                No positions are currently available. Check back soon for new opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* Hiring Process Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight mb-4" style={{ fontFamily: helveticaNeue.style.fontFamily }}>
                Hiring process
              </h2>
              <p className="text-lg text-muted-foreground" style={{ fontFamily: geistSans.style.fontFamily }}>
                What to expect when applying to Voidnet.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {hiringSteps.map((step, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <h3 className="text-lg font-medium" style={{ fontFamily: geistSans.style.fontFamily }}>
                        {step.step}
                      </h3>
                    </div>
                    <p className="text-muted-foreground" style={{ fontFamily: geistSans.style.fontFamily }}>
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      
      <Footer />
    </div>
  )
}
