import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ConsolePage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <p className="text-muted-foreground">
        Welcome to the Voidnet Console. Manage your interfaces, API keys, and monitor your usage.
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Interfaces</CardTitle>
            <CardDescription>Manage your AI interfaces</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Generate and manage API keys</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
            <CardDescription>Monitor your API usage</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
