"use client"

import { useEffect, useState } from "react"
import { Header } from '@/components/nonauth/header';
import { Footer } from "@/components/footer";
import Link from 'next/link';
import Image from 'next/image';
import { getAllNews } from '@/app/lib/news';

// Load and sort news from JSON (latest first)
const allNews = getAllNews().sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});

export default function NewsPage() {
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
    <>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <div className="mx-auto max-w-[1728px] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight mb-12">Newsroom</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {allNews.map((newsItem) => (
              <Link 
                key={newsItem.slug} 
                href={`/news/${newsItem.slug}`}
                className="group"
              >
                <article className="flex flex-col">
                  {newsItem.image && (
                    <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted mb-4">
                      <Image
                        src={newsItem.image}
                        alt={newsItem.title}
                        width={512}
                        height={384}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2 ml-1">
                    <span className="font-medium text-foreground">{newsItem.category}</span>
                    <time dateTime={newsItem.date}>{newsItem.date}</time>
                  </div>
                  
                  <h2 className="text-lg font-medium mb-2 group-hover:underline decoration-1 underline-offset-4 ml-1">
                    {newsItem.title}
                  </h2>
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
