"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

interface AppType {
  id: string
  name: string
  description: string
  status: 'available' | 'coming-soon'
  releaseDate?: string
}

const appTypes: AppType[] = [
  {
    id: "mcp",
    name: "AI Tools (MCP)",
    description: "Connect AI models with external data sources and tools. Build interfaces that VoidAI and other AI assistants can use.",
    status: 'available'
  },
  {
    id: "a2a",
    name: "AI Agents (A2A)",
    description: "Enable seamless communication between AI agents. Build agents that can collaborate across different frameworks and vendors.",
    status: 'coming-soon',
    releaseDate: 'May 26'
  },
  {
    id: "llm",
    name: "LLM Integration",
    description: "Integrate with language model providers. Build apps that leverage various LLM capabilities.",
    status: 'coming-soon',
    releaseDate: 'May 29'
  },
  {
    id: "acp",
    name: "Shop (ACP)",
    description: "Enable commerce between AI agents and businesses. Build stores that AI assistants can discover and transact with.",
    status: 'coming-soon',
    releaseDate: 'June 10'
  },
]

export default function PublishAppsPage() {
  const router = useRouter()

  const handlePublish = (appType: string) => {
    if (appType === 'mcp') {
      router.push('/console/publish-apps/mcp')
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h3 className="text-lg font-semibold">Publish Apps</h3>
      </div>

      <div className="space-y-2">
        {appTypes.map((appType) => (
          <div
            key={appType.id}
            className="flex items-center justify-between py-4 px-6 hover:bg-accent rounded-lg transition-colors"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium">{appType.name}</h3>
                {appType.status === 'coming-soon' && (
                  <Badge variant="outline">Released {appType.releaseDate}</Badge>
                )}
              </div>
              <p className="text-muted-foreground text-sm">{appType.description}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              disabled={appType.status === 'coming-soon'}
              onClick={() => handlePublish(appType.id)}
            >
              {appType.status === 'available' ? (
                <>
                  Publish
                  <ChevronRight className="ml-1 h-4 w-4" />
                </>
              ) : (
                `Released ${appType.releaseDate}`
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
