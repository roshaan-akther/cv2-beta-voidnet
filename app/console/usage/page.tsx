"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, Zap, Activity, Clock, AlertCircle, CreditCard, ChevronRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock data
const mockMetrics = {
  totalApiCalls: 89000,
  totalSpending: 2450,
  subscribedApps: 8,
  rateLimitUsage: 65,
  avgResponseTime: 145,
  errorRate: 1.2,
}

const mockApiCallsOverTime = [
  { date: "Apr 15", calls: 2800 },
  { date: "Apr 16", calls: 2950 },
  { date: "Apr 17", calls: 3100 },
  { date: "Apr 18", calls: 2850 },
  { date: "Apr 19", calls: 3200 },
  { date: "Apr 20", calls: 3350 },
  { date: "Apr 21", calls: 3480 },
  { date: "Apr 22", calls: 3300 },
  { date: "Apr 23", calls: 3450 },
  { date: "Apr 24", calls: 3600 },
  { date: "Apr 25", calls: 3750 },
  { date: "Apr 26", calls: 3620 },
  { date: "Apr 27", calls: 3800 },
  { date: "Apr 28", calls: 3950 },
  { date: "Apr 29", calls: 3850 },
  { date: "Apr 30", calls: 4000 },
  { date: "May 1", calls: 4150 },
  { date: "May 2", calls: 4080 },
  { date: "May 3", calls: 4220 },
  { date: "May 4", calls: 4350 },
  { date: "May 5", calls: 4280 },
  { date: "May 6", calls: 4420 },
  { date: "May 7", calls: 4550 },
  { date: "May 8", calls: 4480 },
  { date: "May 9", calls: 4620 },
  { date: "May 10", calls: 4750 },
  { date: "May 11", calls: 4680 },
  { date: "May 12", calls: 4820 },
  { date: "May 13", calls: 4950 },
  { date: "May 14", calls: 4880 },
  { date: "May 15", calls: 5020 },
]

const mockSpendingOverTime = [
  { month: "Jun 2025", spending: 1800 },
  { month: "Jul 2025", spending: 1850 },
  { month: "Aug 2025", spending: 1920 },
  { month: "Sep 2025", spending: 1980 },
  { month: "Oct 2025", spending: 2050 },
  { month: "Nov 2025", spending: 2120 },
  { month: "Dec 2025", spending: 2080 },
  { month: "Jan 2026", spending: 2150 },
  { month: "Feb 2026", spending: 2220 },
  { month: "Mar 2026", spending: 2280 },
  { month: "Apr 2026", spending: 2350 },
  { month: "May 2026", spending: 2450 },
]

const mockErrorRate = [
  { date: "Apr 15", rate: 1.5 },
  { date: "Apr 16", rate: 1.4 },
  { date: "Apr 17", rate: 1.3 },
  { date: "Apr 18", rate: 1.5 },
  { date: "Apr 19", rate: 1.2 },
  { date: "Apr 20", rate: 1.3 },
  { date: "Apr 21", rate: 1.2 },
  { date: "Apr 22", rate: 1.1 },
  { date: "Apr 23", rate: 1.2 },
  { date: "Apr 24", rate: 1.1 },
  { date: "Apr 25", rate: 1.2 },
  { date: "Apr 26", rate: 1.1 },
  { date: "Apr 27", rate: 1.0 },
  { date: "Apr 28", rate: 1.1 },
  { date: "Apr 29", rate: 1.0 },
  { date: "Apr 30", rate: 1.1 },
  { date: "May 1", rate: 1.0 },
  { date: "May 2", rate: 1.1 },
  { date: "May 3", rate: 1.0 },
  { date: "May 4", rate: 0.9 },
  { date: "May 5", rate: 1.0 },
  { date: "May 6", rate: 0.9 },
  { date: "May 7", rate: 1.0 },
  { date: "May 8", rate: 0.9 },
  { date: "May 9", rate: 1.0 },
  { date: "May 10", rate: 0.9 },
  { date: "May 11", rate: 1.0 },
  { date: "May 12", rate: 0.9 },
  { date: "May 13", rate: 1.0 },
  { date: "May 14", rate: 0.9 },
  { date: "May 15", rate: 1.2 },
]

const mockTopAppsByUsage = [
  { name: "AI Assistant Pro", calls: 25000, spending: 850 },
  { name: "Data Analytics Dashboard", calls: 18000, spending: 520 },
  { name: "Secure Vault", calls: 15000, spending: 420 },
  { name: "API Gateway Manager", calls: 12000, spending: 380 },
  { name: "Cloud Storage Sync", calls: 8000, spending: 280 },
]

const mockSubscribedApps = [
  { id: "app-1", name: "AI Assistant Pro", calls: 25000, spending: 850, tier: "Paid", status: "Active" },
  { id: "app-2", name: "Data Analytics Dashboard", calls: 18000, spending: 520, tier: "Paid", status: "Active" },
  { id: "app-3", name: "Secure Vault", calls: 15000, spending: 420, tier: "Paid", status: "Active" },
  { id: "app-4", name: "API Gateway Manager", calls: 12000, spending: 380, tier: "Free", status: "Active" },
  { id: "app-5", name: "Cloud Storage Sync", calls: 8000, spending: 280, tier: "Paid", status: "Active" },
  { id: "app-6", name: "Code Generator", calls: 5000, spending: 150, tier: "Free", status: "Active" },
  { id: "app-7", name: "Image Processor", calls: 3500, spending: 120, tier: "Free", status: "Active" },
  { id: "app-8", name: "Text Analyzer", calls: 2500, spending: 80, tier: "Free", status: "Active" },
]

const mockRecentActivity = [
  { timestamp: "May 15, 14:32", app: "AI Assistant Pro", operation: "process_task", status: "Success", responseTime: 120 },
  { timestamp: "May 15, 12:18", app: "Data Analytics Dashboard", operation: "get_data", status: "Success", responseTime: 95 },
  { timestamp: "May 15, 10:45", app: "Secure Vault", operation: "decrypt_file", status: "Success", responseTime: 145 },
  { timestamp: "May 14, 18:22", app: "AI Assistant Pro", operation: "analyze_text", status: "Error", responseTime: 0 },
  { timestamp: "May 14, 15:15", app: "API Gateway Manager", operation: "list_endpoints", status: "Success", responseTime: 78 },
]

const chartConfig = {
  apiCalls: {
    label: "API Calls",
    color: "#3b82f6",
  },
  spending: {
    label: "Spending",
    color: "#10b981",
  },
  errorRate: {
    label: "Error Rate",
    color: "#ef4444",
  },
  callsApps: {
    label: "Calls",
    color: "#3b82f6",
  },
  spendingApps: {
    label: "Spending",
    color: "#10b981",
  },
} satisfies ChartConfig

export default function BuyerUsagePage() {
  const router = useRouter()

  const handleAppClick = (appId: string) => {
    router.push(`/console/usage/${appId}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Buyer Usage</h1>
        <p className="text-muted-foreground mt-1">
          Track your API usage, spending, and subscriptions.
        </p>
      </div>

      {/* Time Filter Tabs */}
      <Tabs defaultValue="30d" className="w-full">
        <TabsList>
          <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
          <TabsTrigger value="90d">Last 90 Days</TabsTrigger>
          <TabsTrigger value="12m">Last 12 Months</TabsTrigger>
        </TabsList>

        <TabsContent value="30d" className="space-y-6">
          {/* Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total API Calls</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.totalApiCalls.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +18.5%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spending</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockMetrics.totalSpending.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.3%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Subscribed Apps</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.subscribedApps}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +2
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rate Limit Usage</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.rateLimitUsage}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5.2%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.avgResponseTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -3.2%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Subscribed Apps Table */}
          <Card>
            <CardHeader>
              <CardTitle>Subscribed Apps</CardTitle>
              <CardDescription>Apps you're subscribed to with usage and spending</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>App Name</TableHead>
                    <TableHead>API Calls</TableHead>
                    <TableHead>Spending</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockSubscribedApps.map((app, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-accent" onClick={() => handleAppClick(app.id)}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>{app.calls.toLocaleString()}</TableCell>
                      <TableCell>${app.spending.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={app.tier === "Paid" ? "default" : "secondary"}>
                          {app.tier}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">{app.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Graphs Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API Calls Over Time</CardTitle>
                <CardDescription>Daily API call count for last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={mockApiCallsOverTime}>
                    <defs>
                      <linearGradient id="fillApiCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={1.0} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Area
                      dataKey="calls"
                      type="natural"
                      fill="url(#fillApiCalls)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending Over Time</CardTitle>
                <CardDescription>Monthly spending for last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={mockSpendingOverTime}>
                    <defs>
                      <linearGradient id="fillSpending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={1.0} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="month" 
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                    <Area
                      dataKey="spending"
                      type="natural"
                      fill="url(#fillSpending)"
                      stroke="#10b981"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Graphs Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Apps by Usage</CardTitle>
                <CardDescription>Most used apps (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <BarChart accessibilityLayer data={mockTopAppsByUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis type="number" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="calls" fill="var(--color-callsApps)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Spending by App</CardTitle>
                <CardDescription>Monthly spending per app</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <BarChart accessibilityLayer data={mockTopAppsByUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis type="number" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="spending" fill="var(--color-spendingApps)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Error Rate Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Error Rate Over Time</CardTitle>
              <CardDescription>Daily error rate percentage (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                <AreaChart data={mockErrorRate}>
                  <defs>
                    <linearGradient id="fillErrorRate" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={1.0} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
                  <Area
                    dataKey="rate"
                    type="natural"
                    fill="url(#fillErrorRate)"
                    stroke="#ef4444"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Recent Activity Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent API Activity</CardTitle>
              <CardDescription>Latest API calls and their status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>App</TableHead>
                    <TableHead>Operation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRecentActivity.map((activity, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{activity.timestamp}</TableCell>
                      <TableCell>{activity.app}</TableCell>
                      <TableCell>{activity.operation}</TableCell>
                      <TableCell>
                        <Badge variant={activity.status === "Success" ? "default" : "destructive"}>
                          {activity.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{activity.responseTime}ms</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="90d">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">90-day view - Coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="12m">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">12-month view - Coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
