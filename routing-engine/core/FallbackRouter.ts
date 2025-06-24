import { RouterResponse } from "../types/types";

export class FallbackRouter {
  private defaultResponses = [
    "I'm not sure I understand. Could you rephrase that?",
    "Let me connect you with a human agent who can help.",
    "I don't have information on that yet. Would you like me to research it?",
  ];

  async route(): Promise<RouterResponse> {
    return {
      type: "fallback",
      confidence: 0,
      response:
        this.defaultResponses[
          Math.floor(Math.random() * this.defaultResponses.length)
        ],
      metadata: {
        source: "system",
      },
    };
  }
}
