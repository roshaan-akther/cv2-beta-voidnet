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
  BookOpen,
  MessageSquare,
  ThumbsUp,
  Keyboard,
  Sparkles,
  Home} from "lucide-react"

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { instrumentSans, geistSans } from "@/lib/fonts"

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
      <SidebarContent className="bg-background" style={{ fontFamily: geistSans.style.fontFamily }}>
        <SidebarMenus projects={data.overview} label="Overview" />
        <SidebarMenus projects={data.publisher} label="Publisher" />
        <SidebarMenus projects={data.buyer} label="Buyers" />
      </SidebarContent>
      <SidebarFooter className="bg-background" style={{ fontFamily: geistSans.style.fontFamily }}>
        <SidebarMenu className="gap-0">
          {data.footer.map((item) => (
            item.title === "Help" ? (
              <SidebarMenuItem key={item.title}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton>
                      {item.icon}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="top" align="end">
                    <DropdownMenuItem asChild>
                      <a href="/console/docs">
                        <BookOpen className="mr-2 h-4 w-4" />
                        <span>Documentation</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/contact">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        <span>Contact</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/feedback">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        <span>Feedback</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/console/shortcuts">
                        <Keyboard className="mr-2 h-4 w-4" />
                        <span>Shortcuts</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a href="/">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home page</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="grid grid-cols-4 gap-2 p-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuItem asChild className="justify-center p-2">
                              <a href={process.env.NEXT_PUBLIC_AI_URL || "/voidai"}>
                                <Sparkles className="h-5 w-5" />
                              </a>
                            </DropdownMenuItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>VoidAI</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuItem asChild className="justify-center p-2">
                              <a href={process.env.NEXT_PUBLIC_AUTH_URL || "/auth"}>
                                <User className="h-5 w-5" />
                              </a>
                            </DropdownMenuItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Accounts</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuItem asChild className="justify-center p-2">
                              <a href="/">
                                <Globe className="h-5 w-5" />
                              </a>
                            </DropdownMenuItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voidnet</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuItem asChild className="justify-center p-2">
                              <a href="/console/docs">
                                <BookOpen className="h-5 w-5" />
                              </a>
                            </DropdownMenuItem>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Documentation</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>
            ) : (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          ))}
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
