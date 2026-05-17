"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { AtSign } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { geistSans } from "@/lib/fonts"

interface UserInfo {
  display_name?: string | null;
  email?: string;
  username?: string | null;
}

export function HeaderActions() {
  const [userInfo, setUserInfo] = React.useState<UserInfo | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/auth/userinfo')
        if (response.ok) {
          const data = await response.json()
          setUserInfo(data)
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserInfo()
  }, [])

  const username = userInfo?.username || userInfo?.email || 'User'

  return (
    <div className="flex items-center gap-2 text-sm">
      {loading ? (
        <Skeleton className="h-7 w-24 rounded-full" />
      ) : userInfo ? (
        <>
          {/* Desktop - Show full username */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full" style={{ fontFamily: geistSans.style.fontFamily }}>
            <span className="text-base font-medium"><span className="text-white">@</span><span className="text-white/80">{username}</span></span>
          </div>

          {/* Mobile - Show @ icon with dropdown */}
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-muted">
                  <AtSign className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" side="bottom">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium" style={{ fontFamily: geistSans.style.fontFamily }}>
                    <span className="text-white">@</span><span className="text-white/80">{username}</span>
                  </p>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : null}
    </div>
  )
}
