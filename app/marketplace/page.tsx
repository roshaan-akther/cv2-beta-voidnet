"use client"

import { Button } from "@/components/ui/button"
import { Header } from "@/components/nonauth/header"
import { instrumentSans } from "@/lib/fonts"
import { Bot, BarChart3, Lock, Plug, Cloud, Zap } from "lucide-react"

interface App {
  id: string
  name: string
  subtitle: string
  icon: any
}

const mockApps: App[] = [
  {
    id: "1",
    name: "AI Assistant Pro",
    subtitle: "Automate your workflow with AI-powered assistant",
    icon: Bot
  },
  {
    id: "2",
    name: "Data Analytics Dashboard",
    subtitle: "Real-time analytics and visualization",
    icon: BarChart3
  },
  {
    id: "3",
    name: "Secure Vault",
    subtitle: "Military-grade encryption for teams",
    icon: Lock
  },
  {
    id: "4",
    name: "API Gateway Manager",
    subtitle: "Real-time logs and analytics included",
    icon: Plug
  },
  {
    id: "5",
    name: "Cloud Storage Sync",
    subtitle: "Automatic backup across all devices",
    icon: Cloud
  },
  {
    id: "6",
    name: "Task Automation",
    subtitle: "Smart automation for repetitive tasks",
    icon: Zap
  },
  {
    id: "7",
    name: "Code Editor Pro",
    subtitle: "Advanced IDE with AI completions",
    icon: Bot
  },
  {
    id: "8",
    name: "Database Manager",
    subtitle: "Manage databases with ease",
    icon: BarChart3
  },
  {
    id: "9",
    name: "Security Scanner",
    subtitle: "Scan for vulnerabilities automatically",
    icon: Lock
  }
]

export default function MarketplacePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: instrumentSans.style.fontFamily }}>Voidnet Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover and publish applications on Voidnet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mockApps.map((app) => (
            <div
              key={app.id}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer"
            >
              {/* Left: Icon */}
              <div className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <app.icon className="w-6 h-6" />
              </div>
              
              {/* Middle: Title and Subtitle */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-xs md:text-xs">{app.name}</h3>
                <p className="text-[10px] sm:text-[10px] md:text-[10px] text-muted-foreground truncate">{app.subtitle}</p>
              </div>

              {/* Right: View Button */}
              <Button
                size="sm"
                className="rounded-full px-3 sm:px-4 text-[10px] font-medium h-7 flex-shrink-0 bg-blue-900/30 hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 backdrop-blur-sm"
              >
                View
              </Button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
