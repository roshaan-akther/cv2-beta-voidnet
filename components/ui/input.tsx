import * as React from "react"

import { cn } from "@/lib/utils"
import { geistSans } from "@/lib/fonts"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-10 w-full min-w-0 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 dark:bg-background dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        geistSans.style.fontFamily,
        className
      )}
      {...props}
    />
  )
}

export { Input }
