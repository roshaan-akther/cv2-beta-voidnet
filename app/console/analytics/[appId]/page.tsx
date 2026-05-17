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
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

// Mock app data
const mockApps: Record<string, {
  name: string
  description: string
  protocol: string
  status: 'active' | 'inactive'
  createdAt: string
}> = {
  "app-1": {
    name: "AI Assistant Pro",
    description: "Advanced AI assistant with task automation and natural language processing",
    protocol: "MCP",
    status: "active",
    createdAt: "2025-01-15"
  },
  "app-2": {
    name: "Data Analytics Dashboard",
    description: "Real-time data visualization and analytics platform",
    protocol: "MCP",
    status: "active",
    createdAt: "2025-02-20"
  },
  "app-3": {
    name: "Secure Vault",
    description: "Encrypted storage and secure file sharing solution",
    protocol: "MCP",
    status: "active",
    createdAt: "2025-03-10"
  },
  "app-4": {
    name: "API Gateway Manager",
    description: "API management and monitoring tool",
    protocol: "MCP",
    status: "active",
    createdAt: "2025-04-05"
  },
  "app-5": {
    name: "Cloud Storage Sync",
    description: "Multi-cloud storage synchronization service",
    protocol: "MCP",
    status: "active",
    createdAt: "2025-04-20"
  },
}

// Per-app mock metrics
const getMockAppMetrics = (appId: string) => ({
  totalRequests: 45000,
  monthlyRevenue: 5000,
  avgResponseTime: 95,
  errorRate: 0.3,
  activeUsers: 125,
})

// Per-app mock data
const getMockRequestsOverTime = (appId: string) => [
  { date: "Apr 15", requests: 1200 },
  { date: "Apr 16", requests: 1350 },
  { date: "Apr 17", requests: 1480 },
  { date: "Apr 18", requests: 1390 },
  { date: "Apr 19", requests: 1620 },
  { date: "Apr 20", requests: 1750 },
  { date: "Apr 21", requests: 1890 },
  { date: "Apr 22", requests: 1780 },
  { date: "Apr 23", requests: 1850 },
  { date: "Apr 24", requests: 1980 },
  { date: "Apr 25", requests: 2100 },
  { date: "Apr 26", requests: 1950 },
  { date: "Apr 27", requests: 2180 },
  { date: "Apr 28", requests: 2300 },
  { date: "Apr 29", requests: 2200 },
  { date: "Apr 30", requests: 2350 },
  { date: "May 1", requests: 2450 },
  { date: "May 2", requests: 2380 },
  { date: "May 3", requests: 2520 },
  { date: "May 4", requests: 2650 },
  { date: "May 5", requests: 2580 },
  { date: "May 6", requests: 2720 },
  { date: "May 7", requests: 2850 },
  { date: "May 8", requests: 2780 },
  { date: "May 9", requests: 2920 },
  { date: "May 10", requests: 3050 },
  { date: "May 11", requests: 2980 },
  { date: "May 12", requests: 3120 },
  { date: "May 13", requests: 3250 },
  { date: "May 14", requests: 3180 },
  { date: "May 15", requests: 3320 },
]

const getMockRevenueOverTime = (appId: string) => [
  { month: "Jun 2025", revenue: 3200 },
  { month: "Jul 2025", revenue: 3400 },
  { month: "Aug 2025", revenue: 3700 },
  { month: "Sep 2025", revenue: 3900 },
  { month: "Oct 2025", revenue: 4200 },
  { month: "Nov 2025", revenue: 4500 },
  { month: "Dec 2025", revenue: 4350 },
  { month: "Jan 2026", revenue: 4600 },
  { month: "Feb 2026", revenue: 4750 },
  { month: "Mar 2026", revenue: 4900 },
  { month: "Apr 2026", revenue: 5100 },
  { month: "May 2026", revenue: 5250 },
]

const getMockErrorRate = (appId: string) => [
  { date: "Apr 15", rate: 0.5 },
  { date: "Apr 16", rate: 0.4 },
  { date: "Apr 17", rate: 0.4 },
  { date: "Apr 18", rate: 0.5 },
  { date: "Apr 19", rate: 0.3 },
  { date: "Apr 20", rate: 0.4 },
  { date: "Apr 21", rate: 0.3 },
  { date: "Apr 22", rate: 0.2 },
  { date: "Apr 23", rate: 0.3 },
  { date: "Apr 24", rate: 0.2 },
  { date: "Apr 25", rate: 0.3 },
  { date: "Apr 26", rate: 0.2 },
  { date: "Apr 27", rate: 0.2 },
  { date: "Apr 28", rate: 0.3 },
  { date: "Apr 29", rate: 0.2 },
  { date: "Apr 30", rate: 0.3 },
  { date: "May 1", rate: 0.2 },
  { date: "May 2", rate: 0.3 },
  { date: "May 3", rate: 0.2 },
  { date: "May 4", rate: 0.1 },
  { date: "May 5", rate: 0.2 },
  { date: "May 6", rate: 0.1 },
  { date: "May 7", rate: 0.2 },
  { date: "May 8", rate: 0.1 },
  { date: "May 9", rate: 0.2 },
  { date: "May 10", rate: 0.1 },
  { date: "May 11", rate: 0.2 },
  { date: "May 12", rate: 0.1 },
  { date: "May 13", rate: 0.2 },
  { date: "May 14", rate: 0.1 },
  { date: "May 15", rate: 0.3 },
]

const getMockTopOperations = (appId: string) => [
  { name: "process_task", requests: 12500, avgTime: 85, errorRate: 0.2 },
  { name: "get_data", requests: 9800, avgTime: 95, errorRate: 0.3 },
  { name: "analyze_text", requests: 8200, avgTime: 110, errorRate: 0.4 },
  { name: "stream_response", requests: 6500, avgTime: 78, errorRate: 0.2 },
  { name: "validate_input", requests: 5000, avgTime: 45, errorRate: 0.1 },
]

const getMockRecentErrors = (appId: string) => [
  { timestamp: "May 15, 14:32", operation: "process_task", error: "Timeout", count: 12 },
  { timestamp: "May 15, 12:18", operation: "analyze_text", error: "Rate limit exceeded", count: 8 },
  { timestamp: "May 14, 18:45", operation: "get_data", error: "Invalid parameter", count: 5 },
  { timestamp: "May 14, 15:22", operation: "stream_response", error: "Connection lost", count: 3 },
  { timestamp: "May 13, 09:15", operation: "process_task", error: "Authentication failed", count: 2 },
]

const chartConfig = {
  requests: {
    label: "Requests",
    color: "#3b82f6",
  },
  revenue: {
    label: "Revenue",
    color: "#10b981",
  },
  errorRate: {
    label: "Error Rate",
    color: "#ef4444",
  },
}

export default function AppAnalyticsPage() {
  const params = useParams()
  const router = useRouter()
  const appId = params.appId as string

  const appData = mockApps[appId] || {
    name: "Unknown App",
    description: "App not found",
    protocol: "Unknown",
    status: "inactive" as const,
    createdAt: "Unknown",
  }

  const metrics = getMockAppMetrics(appId)
  const requestsOverTime = getMockRequestsOverTime(appId)
  const revenueOverTime = getMockRevenueOverTime(appId)
  const errorRate = getMockErrorRate(appId)
  const topOperations = getMockTopOperations(appId)
  const recentErrors = getMockRecentErrors(appId)

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
          <Badge variant={appData.status === 'active' ? 'default' : 'secondary'}>
            {appData.status}
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
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.totalRequests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +15.2%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</div>
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
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.activeUsers}</div>
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
                <CardTitle className="text-sm font-medium">Avg Response Time</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.avgResponseTime}ms</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingDown className="h-3 w-3 mr-1" />
                    -8.2%
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
                  <span className="text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.05%
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
                <CardTitle>Requests Over Time</CardTitle>
                <CardDescription>Daily request count for last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={requestsOverTime}>
                    <defs>
                      <linearGradient id="fillRequests" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="requests"
                      type="natural"
                      fill="url(#fillRequests)"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Over Time</CardTitle>
                <CardDescription>Monthly revenue for last 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={revenueOverTime}>
                    <defs>
                      <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
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
                      dataKey="revenue"
                      type="natural"
                      fill="url(#fillRevenue)"
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
                      <TableHead>Requests</TableHead>
                      <TableHead>Avg Time</TableHead>
                      <TableHead>Error Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topOperations.map((op, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{op.name}</TableCell>
                        <TableCell>{op.requests.toLocaleString()}</TableCell>
                        <TableCell>{op.avgTime}ms</TableCell>
                        <TableCell>
                          <Badge variant={op.errorRate < 0.3 ? "default" : "destructive"}>
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
                <CardTitle>Recent Errors</CardTitle>
                <CardDescription>Latest error occurrences</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Operation</TableHead>
                      <TableHead>Error</TableHead>
                      <TableHead>Count</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentErrors.map((error, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{error.timestamp}</TableCell>
                        <TableCell>{error.operation}</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{error.error}</Badge>
                        </TableCell>
                        <TableCell>{error.count}</TableCell>
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
