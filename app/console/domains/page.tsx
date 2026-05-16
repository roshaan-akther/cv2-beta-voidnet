"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Download, BadgeCheck, GlobeX } from "lucide-react"
import { generateFileName, generateFileContent } from "@/lib/domain-verification"

interface DomainVerification {
  id: string
  domain_name: string
  verification_token: string
  is_verified: boolean
  verified_at: string | null
  created_at: string
}

interface VerificationData {
  verification_id: string
  verification_token: string
  domain: string
  file_name: string
  upload_url: string
  well_known_url: string
  expires_at: Date
}

export default function DomainVerificationPage() {
  const [domain, setDomain] = useState("")
  const [domainError, setDomainError] = useState("")
  const [isInitiating, setIsInitiating] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [verifyingDomainId, setVerifyingDomainId] = useState<string | null>(null)
  const [verification, setVerification] = useState<VerificationData | null>(null)
  const [domains, setDomains] = useState<DomainVerification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const validateDomain = (value: string): string => {
    if (!value) return ""
    
    const trimmed = value.trim()
    
    // Basic domain validation (no protocol allowed)
    const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?(\.[a-zA-Z]{2,})+$/
    if (!domainRegex.test(trimmed)) {
      return "Invalid domain format (e.g., example.com)"
    }
    
    return ""
  }

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDomain(value)
    setDomainError(validateDomain(value))
  }

  const downloadFile = (token: string) => {
    const fileName = generateFileName(token)
    const fileContent = generateFileContent(token)
    
    const blob = new Blob([fileContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const initiateVerification = async () => {
    if (!domain.trim()) {
      alert('Please enter a domain name')
      return
    }

    setIsInitiating(true)
    
    try {
      const res = await fetch('/api/console/domains/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: domain.trim() })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to initiate verification')
      
      setVerification(data)
      await fetchDomains()
    } catch (err: any) {
      alert(err.message || 'Failed to initiate verification')
    } finally {
      setIsInitiating(false)
    }
  }

  const verifyDomain = async (domainId?: string) => {
    const id = domainId || verification?.verification_id
    if (!id) return
    
    setIsVerifying(true)
    setVerifyingDomainId(id)
    
    try {
      const res = await fetch('/api/console/domains/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verification_id: id })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Verification failed')
      if (!data.verified) throw new Error('Verification failed. Make sure the file is uploaded and accessible at the specified URL.')
      
      setVerification(null)
      await fetchDomains()
    } catch (err: any) {
      alert(err.message || 'Verification failed. Make sure the file is uploaded and accessible.')
    } finally {
      setIsVerifying(false)
      setVerifyingDomainId(null)
    }
  }


  const fetchDomains = async () => {
    try {
      const res = await fetch('/api/console/domains/list')
      const data = await res.json()
      setDomains(data)
    } catch (err) {
      console.error('Failed to fetch domains:', err)
    }
  }

  useEffect(() => {
    fetchDomains().finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <h3 className="text-lg font-semibold">Domain Verification</h3>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div>
            <div className="flex gap-2 max-w-2xl items-center">
              <div className="flex items-center gap-0 flex-1 rounded-md bg-muted/50">
                <span className="px-3 text-muted-foreground text-sm">https://</span>
                <Input
                  placeholder="example.com"
                  value={domain}
                  onChange={handleDomainChange}
                  className="border-0 bg-transparent px-2 focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
                />
              </div>
              <Button 
                onClick={initiateVerification} 
                disabled={isInitiating || !domain.trim() || !!domainError}
                className="h-9"
              >
                {isInitiating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate
              </Button>
            </div>
            {domain.trim() && (
              <p className="text-sm text-muted-foreground">
                Full URL: https://{domain.trim()}
              </p>
            )}
            {domainError && <p className="text-sm text-destructive">{domainError}</p>}

            {verification && (
              <div className="rounded-lg p-6 bg-muted/50">
                <h4 className="font-semibold mb-4">Upload Instructions</h4>
                <ol className="list-decimal list-inside space-y-3 text-sm">
                  <li>Download the verification file below</li>
                  <li>Upload to root: <code className="bg-background px-2 py-0.5 rounded">{verification.upload_url}</code></li>
                  <li>Or to .well-known: <code className="bg-background px-2 py-0.5 rounded">{verification.well_known_url}</code></li>
                  <li>Ensure file is publicly accessible (no auth required)</li>
                  <li>Click "Verify Domain" when ready</li>
                </ol>
                
                <div className="flex gap-2 mt-6">
                  <Button onClick={() => downloadFile(verification.verification_token)} variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                  </Button>
                  <Button onClick={() => verifyDomain()} disabled={isVerifying}>
                    {isVerifying && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify Domain
                  </Button>
                  <Button onClick={() => setVerification(null)} variant="ghost">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {domains.length > 0 && (
            <div className="pt-6">
              <h4 className="text-sm font-semibold mb-4">Domains</h4>
              <div className="space-y-2">
                {domains.map((d) => (
                  <div key={d.id} className="flex items-center justify-between py-3 px-4 hover:bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {d.is_verified ? (
                        <BadgeCheck className="h-5 w-5 text-green-600" />
                      ) : (
                        <GlobeX className="h-5 w-5 text-red-600" />
                      )}
                      <div>
                        <p className="font-medium">{d.domain_name}</p>
                        <p className="text-sm text-muted-foreground">
                          {d.is_verified 
                            ? `Verified at ${new Date(d.verified_at || '').toLocaleString()}` 
                            : 'Pending verification'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!d.is_verified && (
                        <>
                          <Button variant="outline" size="sm" onClick={() => downloadFile(d.verification_token)}>
                            Download
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => verifyDomain(d.id)}
                            disabled={verifyingDomainId === d.id}
                          >
                            {verifyingDomainId === d.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              'Verify'
                            )}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
