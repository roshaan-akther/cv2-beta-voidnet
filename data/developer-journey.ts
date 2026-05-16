export interface JourneyCard {
  label: string;
  href: string;
}

export interface JourneyStep {
  stepNumber: number;
  title: string;
  cards: JourneyCard[];
}

export interface JourneyTab {
  value: string;
  label: string;
  steps: JourneyStep[];
}

export const developerJourneyData: JourneyTab[] = [
  {
    value: "publishers",
    label: "Publishers",
    steps: [
      {
        stepNumber: 1,
        title: "Get started",
        cards: [
          { label: "Register account", href: "/console" },
          { label: "Get publisher API key", href: "/console" },
          { label: "Register first app", href: "/console" },
          { label: "Configure server URL", href: "/docs" },
          { label: "Test connection", href: "/docs" },
        ],
      },
      {
        stepNumber: 2,
        title: "Build",
        cards: [
          { label: "Configure MCP endpoint", href: "/docs" },
          { label: "Implement JSON-RPC", href: "/docs" },
          { label: "Add streaming support", href: "/docs" },
          { label: "Session management", href: "/docs" },
          { label: "Error handling", href: "/docs" },
          { label: "Protocol versioning", href: "/docs" },
          { label: "Request tracing", href: "/docs" },
          { label: "Circuit breaker", href: "/docs" },
        ],
      },
      {
        stepNumber: 3,
        title: "Publish",
        cards: [
          { label: "Set pricing tiers", href: "/console" },
          { label: "Configure rate limits", href: "/console" },
          { label: "Define metering", href: "/docs" },
          { label: "Publish to marketplace", href: "/marketplace" },
          { label: "Monitor performance", href: "/console" },
          { label: "Webhook events", href: "/console" },
        ],
      },
      {
        stepNumber: 4,
        title: "Operate",
        cards: [
          { label: "View analytics", href: "/console" },
          { label: "Manage API keys", href: "/console" },
          { label: "Track revenue", href: "/console" },
          { label: "Handle payouts", href: "/console" },
          { label: "Update server URL", href: "/console" },
        ],
      },
    ],
  },
  {
    value: "buyers",
    label: "Buyers",
    steps: [
      {
        stepNumber: 1,
        title: "Get started",
        cards: [
          { label: "Register account", href: "/console" },
          { label: "Get buyer API key", href: "/console" },
          { label: "Browse marketplace", href: "/marketplace" },
          { label: "Subscribe to app", href: "/console" },
          { label: "Test integration", href: "/docs" },
        ],
      },
      {
        stepNumber: 2,
        title: "Build",
        cards: [
          { label: "Integrate with MCP", href: "/docs" },
          { label: "Configure authentication", href: "/docs" },
          { label: "Handle rate limits", href: "/docs" },
          { label: "Implement retry logic", href: "/docs" },
          { label: "Use streaming", href: "/docs" },
          { label: "Session management", href: "/docs" },
          { label: "Error handling", href: "/docs" },
          { label: "Request tracing", href: "/docs" },
        ],
      },
      {
        stepNumber: 3,
        title: "Evaluate & ship",
        cards: [
          { label: "Monitor usage", href: "/console" },
          { label: "Optimize costs", href: "/console" },
          { label: "Test performance", href: "/docs" },
          { label: "Handle errors", href: "/docs" },
          { label: "Scale usage", href: "/console" },
          { label: "Manage subscriptions", href: "/console" },
        ],
      },
      {
        stepNumber: 4,
        title: "Operate",
        cards: [
          { label: "View usage metrics", href: "/console" },
          { label: "Update API keys", href: "/console" },
          { label: "Handle billing", href: "/console" },
          { label: "Contact support", href: "/contact" },
        ],
      },
    ],
  },
];
