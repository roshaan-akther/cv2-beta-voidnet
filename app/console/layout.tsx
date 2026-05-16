"use client"

import React from "react"
import { AppSidebar } from "@/components/console/app-sidebar"
import { HeaderActions } from "@/components/console/header-actions"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import { geistSans } from "@/lib/fonts"

export default function ConsoleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  const getBreadcrumbs = () => {
    const path = pathname.replace('/console', '') || '/'
    
    if (path === '/') {
      return [{ label: 'Console', href: '/console' }]
    }
    
    const segments = path.split('/').filter(Boolean)
    const breadcrumbs = [{ label: 'Console', href: '/console' }]
    
    // Map segments to proper section names
    const sectionMap: Record<string, string> = {
      'publish-apps': 'Publisher',
      'domains': 'Domain Verification',
      'keys': 'Buyer',
      'docs': 'Documentation',
      'settings': 'Settings',
    }
    
    segments.forEach((segment, index) => {
      const href = `/console/${segments.slice(0, index + 1).join('/')}`
      let label = sectionMap[segment] || segment.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())
      
      // For nested paths like publish-apps/mcp, show the parent section
      if (index === 0 && sectionMap[segment]) {
        breadcrumbs.push({ label, href })
      } else if (index > 0) {
        // For nested items, show the full path
        breadcrumbs.push({ label: segment.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase()), href })
      } else {
        breadcrumbs.push({ label, href })
      }
    })
    
    return breadcrumbs
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger className="h-8 w-8" />
            <Separator
              orientation="vertical"
              className="mr-2 data-vertical:h-4 data-vertical:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList style={{ fontFamily: geistSans.style.fontFamily }}>
                {getBreadcrumbs().map((crumb, index) => (
                  <React.Fragment key={crumb.href}>
                    <BreadcrumbItem>
                      {index === getBreadcrumbs().length - 1 ? (
                        <BreadcrumbPage className="text-base font-medium">{crumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink className="text-base font-medium" href={crumb.href}>{crumb.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < getBreadcrumbs().length - 1 && (
                      <BreadcrumbSeparator />
                    )}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto px-3">
            <HeaderActions />
          </div>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
