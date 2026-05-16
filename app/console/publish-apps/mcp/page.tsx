"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Loader2, Globe, ChevronRight, CheckCircle2, Wrench, Database, FileText } from "lucide-react"

export default function MCPPublishPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [tierType, setTierType] = useState<'free' | 'paid' | 'both'>('free')
  const [domains, setDomains] = useState<{ id: string; domain_name: string }[]>([])
  const [isLoadingDomains, setIsLoadingDomains] = useState(true)
  const [showTierConfig, setShowTierConfig] = useState(false)
  const [formData, setFormData] = useState({
    appName: "",
    serverUrl: "",
    description: "",
    freeMeterLimit: "",
    freeRateLimitPerMin: "",
    freeRateLimitPerDay: "",
    paidMeterLimit: "",
    paidRateLimitPerMin: "",
    paidRateLimitPerDay: "",
  })

  const fetchDomains = async () => {
    try {
      const res = await fetch('/api/console/domains/list')
      const data = await res.json()
      // Filter only verified domains
      const verifiedDomains = data.filter((d: { is_verified: boolean }) => d.is_verified)
      setDomains(verifiedDomains)
    } catch (err) {
      console.error('Failed to fetch domains:', err)
      setDomains([])
    } finally {
      setIsLoadingDomains(false)
    }
  }

  useEffect(() => {
    fetchDomains()
  }, [])

  const handleVerifyServer = async () => {
    setIsVerifying(true)
    // Simulate server verification
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsVerified(true)
    setIsVerifying(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      console.log('[CLIENT] Publishing MCP interface:', { ...formData, tierType })
      // TODO: Implement actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('[CLIENT] MCP interface published successfully')
    } catch (error) {
      console.error('[CLIENT] Error publishing MCP interface:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h3 className="text-lg font-semibold">Publish MCP Interface</h3>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="appName">App Name</Label>
            <Input
              id="appName"
              placeholder="my-data-connector (unique per publisher)"
              value={formData.appName}
              onChange={(e) => setFormData({ ...formData, appName: e.target.value })}
              disabled={isSubmitting}
            />
            <p className="text-xs text-muted-foreground">Unique per publisher (like GitHub repo names)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serverUrl">Server Domain</Label>
            {isLoadingDomains ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading domains...
              </div>
            ) : domains.length === 0 ? (
              <div className="text-sm text-muted-foreground">
                No verified domains found. Please verify a domain first.
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-start">
                    {formData.serverUrl || "Select a verified domain"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>Select Server Domain</DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={formData.serverUrl}
                      onValueChange={(value) => setFormData({ ...formData, serverUrl: value })}
                    >
                      {domains.map((domain) => (
                        <DropdownMenuRadioItem key={domain.id} value={domain.domain_name}>
                          <Globe />
                          {domain.domain_name}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <p className="text-xs text-muted-foreground">Select a verified domain to host your MCP interface</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief description of your MCP interface"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              disabled={isSubmitting}
            />
          </div>

          {!isVerified && (
            <Button
              type="button"
              onClick={handleVerifyServer}
              disabled={isVerifying || !formData.serverUrl}
              className="w-full"
            >
              {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Verify Server
            </Button>
          )}

          {isVerified && (
            <div className="space-y-6 p-6 border rounded-lg bg-card">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <h4 className="font-semibold">Server Verified Successfully</h4>
              </div>

              {/* Tools Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-base font-semibold">Tools</Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Executable functions that AI models can invoke to perform actions. Examples: API calls, file operations, database queries. Model-controlled (LLM decides when to use them)
                </p>
                <div className="ml-6 space-y-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Tool {i}</Label>
                      <Input disabled placeholder="Tool name" className="h-8" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-base font-semibold">Resources</Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Data sources that provide contextual information to AI applications. Examples: File contents, database records, API documentation. Application-controlled (client manages access). Supports direct resources and resource templates with URI patterns
                </p>
                <div className="ml-6 space-y-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Resource {i}</Label>
                      <Input disabled placeholder="Resource URI" className="h-8" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Prompts Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-base font-semibold">Prompts</Label>
                </div>
                <p className="text-xs text-muted-foreground ml-6">
                  Pre-defined templates or instructions that guide language model interactions. Examples: System prompts, few-shot examples, workflow templates. User-controlled (requires explicit invocation)
                </p>
                <div className="ml-6 space-y-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Prompt 1</Label>
                    <Textarea disabled placeholder="Prompt template" className="h-20 resize-none" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Prompt 2</Label>
                    <Textarea disabled placeholder="Prompt template" className="h-20 resize-none" />
                  </div>
                </div>
              </div>

              {!showTierConfig && (
                <Button
                  type="button"
                  onClick={() => setShowTierConfig(true)}
                  className="w-full"
                >
                  Proceed to Tier Configuration
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {showTierConfig && (
          <div className="space-y-4">
            <Label>Tier Configuration</Label>
            <div className="flex gap-4">
              <Button
                type="button"
                variant={tierType === 'free' ? 'default' : 'outline'}
                onClick={() => setTierType('free')}
                disabled={isSubmitting}
              >
                Free Only
              </Button>
              <Button
                type="button"
                variant={tierType === 'paid' ? 'default' : 'outline'}
                onClick={() => setTierType('paid')}
                disabled={isSubmitting}
              >
                Paid Only
              </Button>
              <Button
                type="button"
                variant={tierType === 'both' ? 'default' : 'outline'}
                onClick={() => setTierType('both')}
                disabled={isSubmitting}
              >
                Both
              </Button>
            </div>

            <div className="space-y-3 p-4 border rounded-lg bg-card">
              <h4 className="font-medium text-sm">Free Tier</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="freeMeterLimit" className="text-xs">Meter Limit (req/month)</Label>
                  <Input
                    id="freeMeterLimit"
                    type="number"
                    placeholder="10000"
                    value={formData.freeMeterLimit}
                    onChange={(e) => setFormData({ ...formData, freeMeterLimit: e.target.value })}
                    disabled={isSubmitting || tierType === 'paid'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeRateLimitPerMin" className="text-xs">Rate Limit (per min)</Label>
                  <Input
                    id="freeRateLimitPerMin"
                    type="number"
                    placeholder="100"
                    value={formData.freeRateLimitPerMin}
                    onChange={(e) => setFormData({ ...formData, freeRateLimitPerMin: e.target.value })}
                    disabled={isSubmitting || tierType === 'paid'}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeRateLimitPerDay" className="text-xs">Rate Limit (per day)</Label>
                  <Input
                    id="freeRateLimitPerDay"
                    type="number"
                    placeholder="1000"
                    value={formData.freeRateLimitPerDay}
                    onChange={(e) => setFormData({ ...formData, freeRateLimitPerDay: e.target.value })}
                    disabled={isSubmitting || tierType === 'paid'}
                  />
                </div>
              </div>
            </div>

            {(tierType === 'paid' || tierType === 'both') && (
              <div className="space-y-3 p-4 border rounded-lg bg-card">
                <h4 className="font-medium text-sm">Paid Tier</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="paidMeterLimit" className="text-xs">Meter Limit (req/month)</Label>
                    <Input
                      id="paidMeterLimit"
                      type="number"
                      placeholder="100000"
                      value={formData.paidMeterLimit}
                      onChange={(e) => setFormData({ ...formData, paidMeterLimit: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidRateLimitPerMin" className="text-xs">Rate Limit (per min)</Label>
                    <Input
                      id="paidRateLimitPerMin"
                      type="number"
                      placeholder="1000"
                      value={formData.paidRateLimitPerMin}
                      onChange={(e) => setFormData({ ...formData, paidRateLimitPerMin: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="paidRateLimitPerDay" className="text-xs">Rate Limit (per day)</Label>
                    <Input
                      id="paidRateLimitPerDay"
                      type="number"
                      placeholder="10000"
                      value={formData.paidRateLimitPerDay}
                      onChange={(e) => setFormData({ ...formData, paidRateLimitPerDay: e.target.value })}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {showTierConfig && (
          <Button type="submit" disabled={isSubmitting || !formData.appName || !formData.serverUrl}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Publish Interface
          </Button>
        )}
      </form>
    </div>
  )
}
