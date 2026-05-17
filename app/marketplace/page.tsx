"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/nonauth/header"
import { helveticaNeue } from "@/lib/fonts"
import { Bot, BarChart3, Lock, Plug, Cloud, Zap, Code, Database, Shield } from "lucide-react"

interface App {
  id: string
  name: string
  description: string
  category: string
  icon: string
  featured: boolean
}

const appsData: App[] = [
  {
    id: "ai-assistant-pro",
    name: "AI Assistant Pro",
    description: "Automate your workflow with AI-powered assistant",
    category: "Productivity",
    icon: "Bot",
    featured: true
  },
  {
    id: "data-analytics-dashboard",
    name: "Data Analytics Dashboard",
    description: "Real-time analytics and visualization",
    category: "Analytics",
    icon: "BarChart3",
    featured: true
  },
  {
    id: "secure-vault",
    name: "Secure Vault",
    description: "Military-grade encryption for teams",
    category: "Security",
    icon: "Lock",
    featured: true
  },
  {
    id: "api-gateway-manager",
    name: "API Gateway Manager",
    description: "Real-time logs and analytics included",
    category: "Developer Tools",
    icon: "Plug",
    featured: false
  },
  {
    id: "cloud-storage-sync",
    name: "Cloud Storage Sync",
    description: "Automatic backup across all devices",
    category: "Storage",
    icon: "Cloud",
    featured: false
  },
  {
    id: "task-automation",
    name: "Task Automation",
    description: "Smart automation for repetitive tasks",
    category: "Productivity",
    icon: "Zap",
    featured: false
  },
  {
    id: "code-editor-pro",
    name: "Code Editor Pro",
    description: "Advanced IDE with AI completions",
    category: "Developer Tools",
    icon: "Code",
    featured: false
  },
  {
    id: "database-manager",
    name: "Database Manager",
    description: "Manage databases with ease",
    category: "Developer Tools",
    icon: "Database",
    featured: false
  },
  {
    id: "security-scanner",
    name: "Security Scanner",
    description: "Scan for vulnerabilities automatically",
    category: "Security",
    icon: "Shield",
    featured: false
  }
]

const iconMap: Record<string, any> = {
  Bot,
  BarChart3,
  Lock,
  Plug,
  Cloud,
  Zap,
  Code,
  Database,
  Shield
}

export default function MarketplacePage() {
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
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold" style={{ fontFamily: helveticaNeue.style.fontFamily }}>Voidnet Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Discover and publish applications on Voidnet
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {appsData.map((app) => {
            const IconComponent = iconMap[app.icon] || Bot
            return (
              <div
                key={app.id}
                className="flex items-end gap-3 p-4 rounded-xl hover:bg-accent/50 transition-colors cursor-pointer min-h-[120px]"
              >
                {/* Left: Icon */}
                <div className="w-12 h-12 sm:w-12 sm:h-12 md:w-12 md:h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <IconComponent className="w-6 h-6" />
                </div>

                {/* Middle: Title and Subtitle */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-base sm:text-base md:text-base">{app.name}</h3>
                  <p className="text-sm sm:text-sm md:text-sm text-muted-foreground line-clamp-2">{app.description}</p>
                </div>

                {/* Right: View Button */}
                <Button
                  size="sm"
                  className="rounded-full px-3 sm:px-4 text-[10px] font-medium h-7 flex-shrink-0 bg-blue-900/30 hover:bg-blue-900/50 text-blue-900 dark:text-blue-200 backdrop-blur-sm"
                >
                  View
                </Button>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
