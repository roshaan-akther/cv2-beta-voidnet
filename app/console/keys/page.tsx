"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Copy, Trash2, MoreHorizontal, Loader2 } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCreating, setIsCreating] = useState(false)
  const [isRevoking, setIsRevoking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const fetchKeys = async () => {
    try {
      console.log('[CLIENT] Starting fetchKeys')
      setIsLoading(true)
      setError(null)
      console.log('[CLIENT] Fetching from /api/console/keys')
      const response = await fetch('/api/console/keys')
      console.log('[CLIENT] Response status:', response.status, response.statusText)
      console.log('[CLIENT] Response headers:', Object.fromEntries(response.headers.entries()))
      
      if (!response.ok) {
        console.error('[CLIENT] Response not OK:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('[CLIENT] Error response body:', errorText)
        throw new Error('Failed to fetch API keys')
      }
      
      const data = await response.json()
      console.log('[CLIENT] Response data:', data)
      setKeys(data.keys || [])
      console.log('[CLIENT] Keys set successfully, count:', data.keys?.length || 0)
    } catch (err) {
      console.error('[CLIENT] Error fetching API keys:', err)
      setError('Failed to load API keys')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchKeys()
  }, [])

  const generateKey = async () => {
    if (!newKeyName.trim()) return
    
    try {
      console.log('[CLIENT] Starting generateKey with name:', newKeyName)
      setIsCreating(true)
      setError(null)
      const requestBody = { keyName: newKeyName }
      console.log('[CLIENT] Request body:', requestBody)
      
      const response = await fetch('/api/console/keys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      console.log('[CLIENT] Generate response status:', response.status, response.statusText)
      console.log('[CLIENT] Generate response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        console.error('[CLIENT] Generate response not OK:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('[CLIENT] Generate error response body:', errorText)
        throw new Error('Failed to generate API key')
      }

      const data = await response.json()
      console.log('[CLIENT] Generate response data:', data)
      setGeneratedKey(data.key)
      setNewKeyName("")
      setIsDialogOpen(false)
      console.log('[CLIENT] Key generated successfully, refreshing keys list')
      
      await fetchKeys()
    } catch (err) {
      console.error('[CLIENT] Error generating API key:', err)
      setError('Failed to generate API key')
    } finally {
      setIsCreating(false)
    }
  }

  const revokeKey = async (id: string) => {
    try {
      console.log('[CLIENT] Starting revokeKey for id:', id)
      setIsRevoking(true)
      setError(null)
      console.log('[CLIENT] Sending DELETE to /api/console/keys/' + id)
      
      const response = await fetch(`/api/console/keys/${id}`, {
        method: 'DELETE',
      })

      console.log('[CLIENT] Revoke response status:', response.status, response.statusText)
      console.log('[CLIENT] Revoke response headers:', Object.fromEntries(response.headers.entries()))

      if (!response.ok) {
        console.error('[CLIENT] Revoke response not OK:', response.status, response.statusText)
        const errorText = await response.text()
        console.error('[CLIENT] Revoke error response body:', errorText)
        throw new Error('Failed to revoke API key')
      }

      const data = await response.json()
      console.log('[CLIENT] Revoke response data:', data)
      setKeyToRevoke(null)
      console.log('[CLIENT] Key revoked successfully, refreshing keys list')
      
      await fetchKeys()
    } catch (err) {
      console.error('[CLIENT] Error revoking API key:', err)
      setError('Failed to revoke API key')
    } finally {
      setIsRevoking(false)
    }
  }

  const confirmRevoke = (id: string) => {
    setKeyToRevoke(id)
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const activeKeys = keys.filter(k => k.isActive)
  const revokedKeys = keys.filter(k => !k.isActive)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your API Keys</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={isLoading}>Generate API Key</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create API Key</DialogTitle>
              <DialogDescription>
                Enter a name for your API key to identify it later.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Production Key"
                  value={newKeyName}
                  onChange={(e) => setNewKeyName(e.target.value)}
                  disabled={isCreating}
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={generateKey} disabled={isCreating || !newKeyName.trim()}>
                {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Generate
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {error && (
        <div className="text-sm text-destructive">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          {activeKeys.length === 0 && revokedKeys.length === 0 && (
            <p className="text-sm text-muted-foreground">
              No API keys generated yet. Create your first key to get started.
            </p>
          )}

          {activeKeys.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Key</TableHead>
                  <TableHead className="hidden md:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activeKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell className="font-mono text-sm">••••••••••••••••</TableCell>
                    <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                      {new Date(key.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" disabled={isRevoking}>
                            {isRevoking && keyToRevoke === key.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <MoreHorizontal className="h-4 w-4" />
                            )}
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => confirmRevoke(key.id)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2 text-destructive" />
                            Revoke Key
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {revokedKeys.length > 0 && (
            <div className="mt-8">
              <h4 className="text-sm font-semibold mb-2 text-muted-foreground">Revoked Keys</h4>
              <Table>
                <TableBody>
                  {revokedKeys.map((key) => (
                    <TableRow key={key.id} className="opacity-50">
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell className="font-mono text-sm">••••••••••••••••</TableCell>
                      <TableCell className="text-sm text-muted-foreground hidden md:table-cell">
                        Revoked: {new Date(key.updatedAt).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right" />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </>
      )}
      <Dialog open={keyToRevoke !== null} onOpenChange={() => setKeyToRevoke(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Revoke API Key</DialogTitle>
            <DialogDescription>
              Are you sure you want to revoke this API key? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setKeyToRevoke(null)} disabled={isRevoking}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => keyToRevoke && revokeKey(keyToRevoke)}
              disabled={isRevoking}
            >
              {isRevoking && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Revoke
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={generatedKey !== null} onOpenChange={() => setGeneratedKey(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>API Key Generated</DialogTitle>
            <DialogDescription>
              Copy this key now. You won't be able to see it again.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-muted rounded-lg overflow-x-auto">
            <code className="font-mono text-sm whitespace-nowrap block">{generatedKey}</code>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => generatedKey && copyToClipboard(generatedKey)}
            >
              {copied ? (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </>
              )}
            </Button>
            <Button onClick={() => setGeneratedKey(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
