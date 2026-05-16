"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
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
        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full" style={{ fontFamily: geistSans.style.fontFamily }}>
          <span className="text-base font-medium"><span className="text-white">@</span><span className="text-white/80">{username}</span></span>
        </div>
      ) : null}
    </div>
  )
}
