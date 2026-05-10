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
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
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
      name: "Documentation",
      url: "/console/docs",
      icon: <FileText />,
    },
  ],
  publisher: [
    {
      name: "Analytics",
      url: "/console/analytics",
      icon: <BarChart />,
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
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader className="p-4 pt-3">
        <h1 className="text-xl font-semibold mb-2" style={{ fontFamily: 'var(--font-instrument)' }}>
          <span className="font-bold">Voidnet</span>
          <span className="font-light ml-1">Console</span>
        </h1>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.overview} label="Overview" />
        <NavProjects projects={data.publisher} label="Publisher" />
        <NavProjects projects={data.buyer} label="Buyers" />
      </SidebarContent>
      <SidebarFooter>
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
