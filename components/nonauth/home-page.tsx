'use client';

import { Header } from "@/components/nonauth/header";
import { Footer } from "@/components/footer";
import { MessageBar } from "@/components/nonauth/message-bar";
import { Button } from "@/components/ui/button";
import { DeveloperCodeExamples } from "@/components/developer-code-examples";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { helveticaNeue } from "@/lib/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { StarEffect } from "@/dump/star-effect";
import { ArrowRight } from "lucide-react";
import { developerJourneyData } from "@/data/developer-journey";
import { getRecentNews } from "@/app/lib/news";
import type { NewsItem } from "@/app/lib/news";

export function HomePage({ isAuthenticated }: { isAuthenticated: boolean }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const recentNews = getRecentNews(6);

  const handleMessage = (message: string) => {
    console.log('Message:', message);
    // Handle message logic here
  };

  const stopGeneration = () => {
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen relative">
      <StarEffect />
      <Header isAuthenticated={isAuthenticated} />
      
      <main id="main">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="py-16 sm:py-24 lg:py-28 text-center">
              <div className="max-w-3xl mx-auto">
                <h1 
                  className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-13 mt-8"
                  style={{ fontFamily: helveticaNeue.style.fontFamily }}
                >
                  an Agentic Voidnet. <span className="text-muted-foreground">Internet.</span>
                </h1>
                
                {/* Message Bar */}
                <div className="mb-6">
                  <MessageBar
                    onMessage={handleMessage}
                    isGenerating={isGenerating}
                    onStopGeneration={stopGeneration}
                  />
                </div>

                <p className="text-sm sm:text-base text-muted-foreground mb-8 max-w-3xl mx-auto">
                  We're building the infrastructure for a world where AI agents communicate, collaborate, and compose with each other to solve humanity's complex problems. Voidnet is the execution engine that makes this agentic future possible—connecting creators, tools, and intelligence into one seamless ecosystem.
                </p>
                <div className="flex flex-wrap gap-4 mb-10 justify-center">
                  <Button size="lg" asChild>
                    <Link href="/marketplace">Try Voidnet</Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="/news">Read the news</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section>
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:py-24">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight">Recent news</h2>
              <Link href="/news" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                View more
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 gap-y-4">
              {recentNews.map((news) => (
                <Link key={news.slug} href={`/news/${news.slug}`} className="group flex gap-3 rounded-lg bg-background transition-colors">
                  <div className="w-48 h-48 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={news.image || "/assets/placeholder.png"}
                      alt={news.title}
                      width={384}
                      height={384}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex flex-col justify-center min-w-0 pl-2">
                    <div className="text-[10px] text-muted-foreground mb-1">
                      <span className="font-medium text-foreground">{news.category}</span>
                      <time className="ml-2">{new Date(news.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</time>
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2">{news.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Developer Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              <div className="order-1 lg:order-1 text-center lg:text-left">
                <p className="text-sm font-medium text-muted-foreground mb-2">Developer Platform</p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-6">
                  Start building <br className="hidden sm:inline" />on Voidnet
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                  Publish MCP tools, integrate with our gateway, and build the agentic web. From first API call to production.
                </p>
                <div className="max-w-md mx-auto lg:mx-0 space-y-6">
                  <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search documentation..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-full bg-background border border-border focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent text-sm"
                    />
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                    <Button asChild>
                      <Link href="/docs">Quickstart</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/console">Get API key</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/api">API reference</Link>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="order-2 lg:order-2">
                <DeveloperCodeExamples />
              </div>
            </div>
          </div>
        </section>

        {/* Developer Journey Section */}
        <section className="py-16 sm:py-24 bg-background">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4 text-center">
                From idea to production
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground text-center">
                Follow the lifecycle or jump to what you need
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <Tabs defaultValue={developerJourneyData[0].value} className="w-full">
                <div className="flex justify-center mb-12">
                  <TabsList>
                    {developerJourneyData.map((tab) => (
                      <TabsTrigger key={tab.value} value={tab.value}>
                        {tab.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {developerJourneyData.map((tab) => (
                  <TabsContent key={tab.value} value={tab.value}>
                    <div className="space-y-12">
                      {tab.steps.map((step) => (
                        <div key={step.stepNumber} className="space-y-4">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-bold">
                              {step.stepNumber}
                            </div>
                            <h3 className="text-lg font-medium">{step.title}</h3>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {step.cards.map((card) => (
                              <Link
                                key={card.label}
                                href={card.href}
                                className="group block p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                              >
                                <div className="flex items-center justify-between gap-4">
                                  <span className="text-sm font-medium whitespace-nowrap flex-shrink-0">
                                    {card.label}
                                  </span>
                                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </section>

        {/* Contact & Feedback Section */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.1] mb-4 text-center">
                Get in touch
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground text-center">
                Have questions or feedback? We'd love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact - Left */}
              <Link href="/contact" className="group">
                <div className="h-full rounded-lg overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted rounded-lg">
                    <Image
                      src="/assets/contact-blur.jpg"
                      alt="Contact us"
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-medium mb-2">Contact Us</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connect directly with our team for conversations and support.
                    </p>
                    <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                      <span>Go to contact form</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Feedback - Right */}
              <Link href="/feedback" className="group">
                <div className="h-full rounded-lg overflow-hidden">
                  <div className="aspect-video w-full overflow-hidden bg-muted rounded-lg">
                    <Image
                      src="/assets/feedback-blur.jpg"
                      alt="Send feedback"
                      width={400}
                      height={225}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-lg"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-medium mb-2">Send Feedback</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share your thoughts, report bugs, or suggest features to help us improve.
                    </p>
                    <div className="flex items-center text-primary group-hover:gap-2 transition-all">
                      <span>Go to feedback form</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
