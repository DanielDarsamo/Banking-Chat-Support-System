export interface RouterResponse {
  type: "intent" | "faq" | "fallback" | "agent";
  confidence: number;
  response: string;
  metadata: {
    source: string;
    references?: any[];
    intent?: string;
  };
}

export interface Intent {
  intent: string;
  examples: string[];
  responses: string[];
}
