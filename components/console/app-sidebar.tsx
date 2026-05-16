"use client"

import * as React from "react"
import {
  Key,
  Settings,
  HelpCircle,
  LayoutDashboard,
  User,
  FileText,
  BarChart,
  Store,
  Globe,
} from "lucide-react"

import { SidebarMenus } from "@/components/console/sidebar-menus"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { instrumentSans } from "@/lib/fonts"

const data = {
  overview: [
    {
      name: "Console",
      url: "/console",
      icon: <LayoutDashboard />,
    },
    {
      name: "Marketplace",
      url: "/marketplace",
      icon: <Store />,
    },
    {
      name: "Accounts",
      url: process.env.NEXT_PUBLIC_AUTH_URL || "http://localhost:3020",
      icon: <User />,
    },
    {
      name: "Domain Verification",
      url: "/console/domains",
      icon: <Globe />,
    },
    {
      name: "Documentation",
      url: "/console/docs",
      icon: <FileText />,
    },
  ],
  publisher: [
    {
      name: "Publish Apps",
      url: "/console/publish-apps",
      icon: <Store />,
    },
  ],
  buyer: [
    {
      name: "API Keys",
      url: "/console/keys",
      icon: <Key />,
    },
  ],
  footer: [
    {
      title: "Settings",
      url: "/console/settings",
      icon: <Settings />,
    },
    {
      title: "Help",
      url: "https://docs.openvoidnet.com",
      icon: <HelpCircle />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0 bg-background" {...props}>
      <SidebarHeader className="p-4 pt-3 bg-background">
        <h1 className="text-xl font-semibold mb-2" style={{ fontFamily: instrumentSans.style.fontFamily }}>
          <span className="font-bold">Voidnet</span>
          <span className="font-light ml-1">Console</span>
        </h1>
      </SidebarHeader>
      <SidebarContent className="bg-background">
        <SidebarMenus projects={data.overview} label="Overview" />
        <SidebarMenus projects={data.publisher} label="Publisher" />
        <SidebarMenus projects={data.buyer} label="Buyers" />
      </SidebarContent>
      <SidebarFooter className="bg-background">
        <SidebarMenu className="gap-0">
          {data.footer.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  {item.icon}
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
