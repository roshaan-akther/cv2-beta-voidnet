"use client"

import { useState } from "react"
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
import { Copy, Trash2, MoreHorizontal } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  key: string
  createdAt: Date
  revoked?: boolean
  revokedAt?: Date
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [keyToRevoke, setKeyToRevoke] = useState<string | null>(null)
  const [generatedKey, setGeneratedKey] = useState<string | null>(null)

  const generateKey = () => {
    if (!newKeyName.trim()) return
    
    const keyValue = `vk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    const newKey: ApiKey = {
      id: Math.random().toString(36).substring(7),
      name: newKeyName,
      key: keyValue,
      createdAt: new Date(),
    }
    
    setKeys([...keys, newKey])
    setNewKeyName("")
    setIsDialogOpen(false)
    setGeneratedKey(keyValue)
  }

  const revokeKey = (id: string) => {
    setKeys(keys.map(key => 
      key.id === id 
        ? { ...key, revoked: true, revokedAt: new Date() }
        : key
    ))
    setKeyToRevoke(null)
  }

  const confirmRevoke = (id: string) => {
    setKeyToRevoke(id)
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
  }

  const activeKeys = keys.filter(k => !k.revoked)
  const revokedKeys = keys.filter(k => k.revoked)

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Your API Keys</h3>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Generate API Key</Button>
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
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={generateKey}>Generate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {activeKeys.length === 0 && (
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
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeKeys.map((key) => (
              <TableRow key={key.id}>
                <TableCell className="font-medium">{key.name}</TableCell>
                <TableCell className="font-mono text-sm">••••••••••••••••</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {key.createdAt.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
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
                  <TableCell className="text-sm text-muted-foreground">
                    Revoked: {key.revokedAt?.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right" />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
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
            <Button variant="outline" onClick={() => setKeyToRevoke(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => keyToRevoke && revokeKey(keyToRevoke)}
            >
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
          <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
            <code className="flex-1 font-mono text-sm">{generatedKey}</code>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => generatedKey && copyToClipboard(generatedKey)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button onClick={() => setGeneratedKey(null)}>
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
