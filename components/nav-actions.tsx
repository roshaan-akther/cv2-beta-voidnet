"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { HomeIcon, FileTextIcon, BookOpenIcon, BotIcon, ActivityIcon, DollarSignIcon, InfoIcon, LayoutDashboardIcon, MoreHorizontalIcon } from "lucide-react"

const data = [
  [
    {
      label: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      label: "Go to Console",
      icon: <LayoutDashboardIcon />,
      href: "/console",
    },
  ],
  [
    {
      label: "Documentation",
      icon: <FileTextIcon />,
      href: process.env.NEXT_PUBLIC_DOCS_URL || "/docs",
      external: true,
    },
    {
      label: "Learn Voidnet",
      icon: <BookOpenIcon />,
      href: "/learn",
    },
  ],
  [
    {
      label: "VoidAI",
      icon: <BotIcon />,
      href: process.env.NEXT_PUBLIC_AI_URL || "/voidai",
      external: true,
    },
  ],
  [
    {
      label: "Status",
      icon: <ActivityIcon />,
      href: process.env.NEXT_PUBLIC_STATUS_URL || "/status",
      external: true,
    },
    {
      label: "How Billing Works",
      icon: <DollarSignIcon />,
      href: "/billing",
    },
    {
      label: "About",
      icon: <InfoIcon />,
      href: "/about",
    },
  ],
]

export function NavActions() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2 text-sm">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 data-[state=open]:bg-accent"
          >
            <MoreHorizontalIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-56 overflow-hidden rounded-lg p-0"
          align="end"
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent>
              {data.map((group, index) => (
                <SidebarGroup key={index} className="border-b last:border-none">
                  <SidebarGroupContent className="gap-0">
                    <SidebarMenu>
                      {group.map((item, index) => (
                        <SidebarMenuItem key={index}>
                          <SidebarMenuButton asChild>
                            <Link
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                            >
                              {item.icon} <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              ))}
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}
