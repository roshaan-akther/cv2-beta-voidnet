"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
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
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Activity, Clock, AlertCircle, ArrowLeft, Zap, Server } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock app data
const mockApps: Record<string, {
  name: string
  description: string
  protocol: string
  tier: 'Free' | 'Paid'
  status: 'Active' | 'Inactive'
  subscribedAt: string
}> = {
  "app-1": {
    name: "AI Assistant Pro",
    description: "Advanced AI assistant with task automation and natural language processing",
    protocol: "MCP",
    tier: "Paid",
    status: "Active",
    subscribedAt: "2025-01-15"
  },
  "app-2": {
    name: "Data Analytics Dashboard",
    description: "Real-time data visualization and analytics platform",
    protocol: "MCP",
    tier: "Paid",
    status: "Active",
    subscribedAt: "2025-02-20"
  },
  "app-3": {
    name: "Secure Vault",
    description: "Encrypted storage and secure file sharing solution",
    protocol: "MCP",
    tier: "Paid",
    status: "Active",
    subscribedAt: "2025-03-10"
  },
  "app-4": {
    name: "API Gateway Manager",
    description: "API management and monitoring tool",
    protocol: "MCP",
    tier: "Free",
    status: "Active",
    subscribedAt: "2025-04-05"
  },
  "app-5": {
    name: "Cloud Storage Sync",
    description: "Multi-cloud storage synchronization service",
    protocol: "MCP",
    tier: "Paid",
    status: "Active",
    subscribedAt: "2025-04-20"
  },
}

// Per-app mock metrics
const getMockAppMetrics = (appId: string) => ({
  totalApiCalls: 25000,
  spending: 850,
  avgResponseTime: 120,
  errorRate: 1.0,
  rateLimitUsage: 72,
})

// Per-app mock data
const getMockApiCallsOverTime = (appId: string) => [
  { date: "Apr 15", calls: 750 },
  { date: "Apr 16", calls: 820 },
  { date: "Apr 17", calls: 890 },
  { date: "Apr 18", calls: 810 },
  { date: "Apr 19", calls: 950 },
  { date: "Apr 20", calls: 1020 },
  { date: "Apr 21", calls: 1080 },
  { date: "Apr 22", calls: 990 },
  { date: "Apr 23", calls: 1050 },
  { date: "Apr 24", calls: 1120 },
  { date: "Apr 25", calls: 1180 },
  { date: "Apr 26", calls: 1110 },
  { date: "Apr 27", caps: 1250 },
  { date: "Apr 28", calls: 1320 },
  { date: "Apr 29", calls: 1260 },
  { date: "Apr 30", calls: 1350 },
  { date: "May 1", calls: 1410 },
  { date: "May 2", calls: 1370 },
  { date: "May 3", calls: 1450 },
  { date: "May 4", calls: 1520 },
  { date: "May 5", calls: 1480 },
  { date: "May 6", calls: 1560 },
  { date: "May 7", calls: 1630 },
  { date: "May 8", calls: 1590 },
  { date: "May 9", calls: 1670 },
  { date: "May 10", calls: 1740 },
  { date: "May 11", calls: 1700 },
  { date: "May 12", calls: 1780 },
  { date: "May 13", calls: 1850 },
  { date: "May 14", calls: 1810 },
  { date: "May 15", calls: 1890 },
]

const getMockSpendingOverTime = (appId: string) => [
  { month: "Jun 2025", spending: 650 },
  { month: "Jul 2025", spending: 680 },
  { month: "Aug 2025", spending: 710 },
  { month: "Sep 2025", spending: 740 },
  { month: "Oct 2025", spending: 770 },
  { month: "Nov 2025", spending: 800 },
  { month: "Dec 2025", spending: 785 },
  { month: "Jan 2026", spending: 815 },
  { month: "Feb 2026", spending: 830 },
  { month: "Mar 2026", spending: 845 },
  { month: "Apr 2026", spending: 860 },
  { month: "May 2026", spending: 875 },
]

const getMockErrorRate = (appId: string) => [
  { date: "Apr 15", rate: 1.2 },
  { date: "Apr 16", rate: 1.1 },
  { date: "Apr 17", rate: 1.1 },
  { date: "Apr 18", rate: 1.2 },
  { date: "Apr 19", rate: 1.0 },
  { date: "Apr 20", rate: 1.1 },
  { date: "Apr 21", rate: 1.0 },
  { date: "Apr 22", rate: 0.9 },
  { date: "Apr 23", rate: 1.0 },
  { date: "Apr 24", rate: 0.9 },
  { date: "Apr 25", rate: 1.0 },
  { date: "Apr 26", rate: 0.9 },
  { date: "Apr 27", rate: 0.9 },
  { date: "Apr 28", rate: 1.0 },
  { date: "Apr 29", rate: 0.9 },
  { date: "Apr 30", rate: 1.0 },
  { date: "May 1", rate: 0.9 },
  { date: "May 2", rate: 1.0 },
  { date: "May 3", rate: 0.9 },
  { date: "May 4", rate: 0.8 },
  { date: "May 5", rate: 0.9 },
  { date: "May 6", rate: 0.8 },
  { date: "May 7", rate: 0.9 },
  { date: "May 8", rate: 0.8 },
  { date: "May 9", rate: 0.9 },
  { date: "May 10", rate: 0.8 },
  { date: "May 11", rate: 0.9 },
  { date: "May 12", rate: 0.8 },
  { date: "May 13", rate: 0.9 },
  { date: "May 14", rate: 0.8 },
  { date: "May 15", rate: 1.0 },
]

const getMockTopOperations = (appId: string) => [
  { name: "process_task", calls: 8500, avgTime: 115, errorRate: 0.8 },
  { name: "get_data", calls: 6200, avgTime: 125, errorRate: 1.1 },
  { name: "analyze_text", calls: 5100, avgTime: 140, errorRate: 1.3 },
  { name: "stream_response", calls: 3200, avgTime: 98, errorRate: 0.7 },
  { name: "validate_input", calls: 2000, avgTime: 65, errorRate: 0.5 },
]

const getMockRecentActivity = (appId: string) => [
  { timestamp: "May 15, 14:32", operation: "process_task", status: "Success", responseTime: 118 },
  { timestamp: "May 15, 12:18", operation: "get_data", status: "Success", responseTime: 122 },
  { timestamp: "May 15, 10:45", operation: "analyze_text", status: "Success", responseTime: 138 },
  { timestamp: "May 14, 18:22", operation: "process_task", status: "Error", responseTime: 0 },
  { timestamp: "May 14, 15:15", operation: "stream_response", status: "Success", responseTime: 95 },
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
  callsOps: {
    label: "Calls",
    color: "#3b82f6",
  },
} satisfies ChartConfig

export default function AppUsagePage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.appId as string

  const appData = mockApps[appId] || {
    name: "Unknown App",
    description: "App not found",
    protocol: "Unknown",
    tier: "Free" as const,
    status: "Inactive" as const,
    subscribedAt: "Unknown",
  }

  const metrics = getMockAppMetrics(appId)
  const apiCallsOverTime = getMockApiCallsOverTime(appId)
  const spendingOverTime = getMockSpendingOverTime(appId)
  const errorRate = getMockErrorRate(appId)
  const topOperations = getMockTopOperations(appId)
  const recentActivity = getMockRecentActivity(appId)

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">{appData.name}</h1>
            <p className="text-muted-foreground mt-1">{appData.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={appData.status === 'Active' ? 'default' : 'secondary'}>
            {appData.status}
          </Badge>
          <Badge variant={appData.tier === 'Paid' ? 'default' : 'secondary'}>
            {appData.tier}
          </Badge>
          <Badge variant="outline">{appData.protocol}</Badge>
        </div>
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
                <CardTitle className="text-sm font-medium">API Calls</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalApiCalls.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +22.5%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spending</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${metrics.spending.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.3%
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
                <div className="text-2xl font-bold">{metrics.rateLimitUsage}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +8.2%
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
                <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -4.5%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.errorRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -0.2%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Graphs Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API Calls Over Time</CardTitle>
                <CardDescription>Daily API call count for last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={apiCallsOverTime}>
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
                  <AreaChart data={spendingOverTime}>
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

          {/* Error Rate Graph */}
          <Card>
            <CardHeader>
              <CardTitle>Error Rate Over Time</CardTitle>
              <CardDescription>Daily error rate percentage (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                <AreaChart data={errorRate}>
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

          {/* Tables Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Operations</CardTitle>
                <CardDescription>Most used operations (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Operation</TableHead>
                      <TableHead>Calls</TableHead>
                      <TableHead>Avg Time</TableHead>
                      <TableHead>Error Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topOperations.map((op, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{op.name}</TableCell>
                        <TableCell>{op.calls.toLocaleString()}</TableCell>
                        <TableCell>{op.avgTime}ms</TableCell>
                        <TableCell>
                          <Badge variant={op.errorRate < 1.0 ? "default" : "destructive"}>
                            {op.errorRate}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

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
                      <TableHead>Operation</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Response Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivity.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{activity.timestamp}</TableCell>
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
          </div>
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
