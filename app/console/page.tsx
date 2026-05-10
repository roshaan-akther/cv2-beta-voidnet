"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface UserInfo {
  display_name?: string | null;
  username?: string | null;
  email?: string;
}

export default function ConsolePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch('/api/auth/userinfo')
        if (response.ok) {
          const data = await response.json()
          setUserInfo(data)
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error)
      }
    }

    fetchUserInfo()
  }, [])

  const displayName = userInfo?.display_name || userInfo?.username || userInfo?.email

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div>
        <h1 className="text-2xl font-semibold">
          {userInfo ? (
            `Welcome, ${displayName}`
          ) : (
            <Skeleton className="h-8 w-48" />
          )}
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your Voidnet applications and settings.
        </p>
      </div>
    </div>
  )
}
