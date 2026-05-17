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
import { TrendingUp, TrendingDown, DollarSign, Users, Activity, Clock, AlertCircle, ChevronRight } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

// Mock data
const mockMetrics = {
  totalRequests: 125000,
  monthlyRevenue: 12500,
  avgResponseTime: 120,
  errorRate: 0.5,
  totalApps: 5,
}

const mockRequestsOverTime = [
  { date: "Apr 15", requests: 3500 },
  { date: "Apr 16", requests: 3800 },
  { date: "Apr 17", requests: 4200 },
  { date: "Apr 18", requests: 3900 },
  { date: "Apr 19", requests: 4500 },
  { date: "Apr 20", requests: 4800 },
  { date: "Apr 21", requests: 5200 },
  { date: "Apr 22", requests: 4900 },
  { date: "Apr 23", requests: 5100 },
  { date: "Apr 24", requests: 5400 },
  { date: "Apr 25", requests: 5600 },
  { date: "Apr 26", requests: 5300 },
  { date: "Apr 27", requests: 5800 },
  { date: "Apr 28", requests: 6100 },
  { date: "Apr 29", requests: 5900 },
  { date: "Apr 30", requests: 6300 },
  { date: "May 1", requests: 6500 },
  { date: "May 2", requests: 6200 },
  { date: "May 3", requests: 6700 },
  { date: "May 4", requests: 7000 },
  { date: "May 5", requests: 6800 },
  { date: "May 6", requests: 7200 },
  { date: "May 7", requests: 7500 },
  { date: "May 8", requests: 7300 },
  { date: "May 9", requests: 7800 },
  { date: "May 10", requests: 8000 },
  { date: "May 11", requests: 7700 },
  { date: "May 12", requests: 8200 },
  { date: "May 13", requests: 8500 },
  { date: "May 14", requests: 8300 },
  { date: "May 15", requests: 8700 },
]

const mockRevenueOverTime = [
  { month: "Jun 2025", revenue: 8000 },
  { month: "Jul 2025", revenue: 8500 },
  { month: "Aug 2025", revenue: 9200 },
  { month: "Sep 2025", revenue: 9800 },
  { month: "Oct 2025", revenue: 10500 },
  { month: "Nov 2025", revenue: 11200 },
  { month: "Dec 2025", revenue: 10800 },
  { month: "Jan 2026", revenue: 11500 },
  { month: "Feb 2026", revenue: 11800 },
  { month: "Mar 2026", revenue: 12200 },
  { month: "Apr 2026", revenue: 12500 },
  { month: "May 2026", revenue: 12800 },
]

const mockSubscriptionTiers = [
  { tier: "Free", count: 280, percentage: 62 },
  { tier: "Paid", count: 170, percentage: 38 },
]

const mockTopApps = [
  { id: "app-1", name: "AI Assistant Pro", requests: 45000, revenue: 5000, avgResponseTime: 95, errorRate: 0.3 },
  { id: "app-2", name: "Data Analytics Dashboard", requests: 32000, revenue: 3500, avgResponseTime: 120, errorRate: 0.4 },
  { id: "app-3", name: "Secure Vault", requests: 28000, revenue: 2800, avgResponseTime: 110, errorRate: 0.5 },
  { id: "app-4", name: "API Gateway Manager", requests: 15000, revenue: 800, avgResponseTime: 140, errorRate: 0.6 },
  { id: "app-5", name: "Cloud Storage Sync", requests: 5000, revenue: 400, avgResponseTime: 180, errorRate: 0.8 },
]

const mockActiveSubscriptions = [
  { month: "Jun 2025", count: 280 },
  { month: "Jul 2025", count: 295 },
  { month: "Aug 2025", count: 310 },
  { month: "Sep 2025", count: 325 },
  { month: "Oct 2025", count: 340 },
  { month: "Nov 2025", count: 355 },
  { month: "Dec 2025", count: 345 },
  { month: "Jan 2026", count: 360 },
  { month: "Feb 2026", count: 375 },
  { month: "Mar 2026", count: 390 },
  { month: "Apr 2026", count: 420 },
  { month: "May 2026", count: 450 },
]

const mockErrorRate = [
  { date: "Apr 15", rate: 0.8 },
  { date: "Apr 16", rate: 0.7 },
  { date: "Apr 17", rate: 0.6 },
  { date: "Apr 18", rate: 0.7 },
  { date: "Apr 19", rate: 0.5 },
  { date: "Apr 20", rate: 0.6 },
  { date: "Apr 21", rate: 0.5 },
  { date: "Apr 22", rate: 0.4 },
  { date: "Apr 23", rate: 0.5 },
  { date: "Apr 24", rate: 0.4 },
  { date: "Apr 25", rate: 0.5 },
  { date: "Apr 26", rate: 0.4 },
  { date: "Apr 27", rate: 0.3 },
  { date: "Apr 28", rate: 0.4 },
  { date: "Apr 29", rate: 0.3 },
  { date: "Apr 30", rate: 0.4 },
  { date: "May 1", rate: 0.3 },
  { date: "May 2", rate: 0.4 },
  { date: "May 3", rate: 0.3 },
  { date: "May 4", rate: 0.2 },
  { date: "May 5", rate: 0.3 },
  { date: "May 6", rate: 0.2 },
  { date: "May 7", rate: 0.3 },
  { date: "May 8", rate: 0.2 },
  { date: "May 9", rate: 0.3 },
  { date: "May 10", rate: 0.2 },
  { date: "May 11", rate: 0.3 },
  { date: "May 12", rate: 0.2 },
  { date: "May 13", rate: 0.3 },
  { date: "May 14", rate: 0.2 },
  { date: "May 15", rate: 0.5 },
]

const mockTransactions = [
  { date: "May 15", app: "AI Assistant Pro", tier: "Paid", amount: 50, status: "Paid" },
  { date: "May 14", app: "Data Analytics Dashboard", tier: "Paid", amount: 35, status: "Paid" },
  { date: "May 13", app: "Secure Vault", tier: "Free", amount: 0, status: "Active" },
  { date: "May 12", app: "AI Assistant Pro", tier: "Paid", amount: 50, status: "Paid" },
  { date: "May 11", app: "API Gateway Manager", tier: "Free", amount: 0, status: "Active" },
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
  subscriptions: {
    label: "Subscriptions",
    color: "#8b5cf6",
  },
  errorRate: {
    label: "Error Rate",
    color: "#ef4444",
  },
  free: {
    label: "Free",
    color: "#3b82f6",
  },
  paid: {
    label: "Paid",
    color: "#10b981",
  },
  requestsApps: {
    label: "Requests",
    color: "#3b82f6",
  },
  revenueApps: {
    label: "Revenue",
    color: "#10b981",
  },
} satisfies ChartConfig

export default function AnalyticsPage() {
  const router = useRouter()

  const handleAppClick = (appId: string) => {
    router.push(`/console/analytics/${appId}`)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4">
      <div>
        <h1 className="text-2xl font-semibold">Publisher Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Track your app performance, subscriptions, and revenue.
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
                <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.totalRequests.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +12.5%
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
                <div className="text-2xl font-bold">${mockMetrics.monthlyRevenue.toLocaleString()}</div>
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
                <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockMetrics.totalApps}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +1
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
                    -5.2%
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
                <div className="text-2xl font-bold">{mockMetrics.errorRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.1%
                  </span>{" "}
                  from last period
                </p>
              </CardContent>
            </Card>
          </div>

          {/* App Performance Table */}
          <Card>
            <CardHeader>
              <CardTitle>App Performance</CardTitle>
              <CardDescription>Performance metrics per app (last 30 days)</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>App Name</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Avg Time</TableHead>
                    <TableHead>Error Rate</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTopApps.map((app, index) => (
                    <TableRow key={index} className="cursor-pointer hover:bg-accent" onClick={() => handleAppClick(app.id)}>
                      <TableCell className="font-medium">{app.name}</TableCell>
                      <TableCell>{app.requests.toLocaleString()}</TableCell>
                      <TableCell>${app.revenue.toLocaleString()}</TableCell>
                      <TableCell>{app.avgResponseTime}ms</TableCell>
                      <TableCell>
                        <Badge variant={app.errorRate < 0.5 ? "default" : "destructive"}>
                          {app.errorRate}%
                        </Badge>
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
                <CardTitle>Requests Over Time</CardTitle>
                <CardDescription>Daily request count for last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                  <AreaChart data={mockRequestsOverTime}>
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
                  <AreaChart data={mockRevenueOverTime}>
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

          {/* Graphs Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Apps by Usage</CardTitle>
                <CardDescription>Requests per app (last 30 days)</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <BarChart accessibilityLayer data={mockTopApps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis type="number" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="requests" fill="var(--color-requestsApps)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by App</CardTitle>
                <CardDescription>Monthly revenue per app</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                  <BarChart accessibilityLayer data={mockTopApps}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis type="number" tick={{ fontSize: 12 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenueApps)" radius={4} />
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
