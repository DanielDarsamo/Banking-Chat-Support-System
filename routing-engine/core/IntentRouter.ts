import { calculateSimilarity } from "../utils/similarity";
import { checkThreshold } from "../utils/threshold";
import { Intent, RouterResponse } from "../types/types";

export class IntentRouter {
  private intents: Intent[];

  constructor(intents: Intent[]) {
    this.intents = intents;
  }

  async route(input: string): Promise<RouterResponse> {
    const matches = await this.findIntentMatches(input);
    const bestMatch = this.selectBestMatch(matches);

    return {
      type: "intent",
      intent: bestMatch.intent,
      confidence: bestMatch.confidence,
      response: this.selectRandomResponse(bestMatch.intent),
      metadata: {
        source: "intents.json",
      },
    };
  }

  private async findIntentMatches(input: string) {
    return Promise.all(
      this.intents.map(async (intent) => ({
        intent,
        confidence: await calculateSimilarity(input, intent.examples),
      }))
    );
  }

  private selectBestMatch(matches: { intent: Intent; confidence: number }[]) {
    return matches.reduce((prev, current) =>
      prev.confidence > current.confidence ? prev : current
    );
  }

  private selectRandomResponse(intent: Intent) {
    return intent.responses[
      Math.floor(Math.random() * intent.responses.length)
    ];
  }
}
