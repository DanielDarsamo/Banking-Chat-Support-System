import { IntentRouter } from "./IntentRouter";
import { FaqRouter } from "./FaqRouter";
import { FallbackRouter } from "./FallbackRouter";
import { RouterResponse } from "./types/types";

export class RoutingEngine {
  private intentRouter: IntentRouter;
  private faqRouter: FaqRouter;
  private fallbackRouter: FallbackRouter;

  constructor(intents: any[], vectorStore: any) {
    this.intentRouter = new IntentRouter(intents);
    this.faqRouter = new FaqRouter(vectorStore);
    this.fallbackRouter = new FallbackRouter();
  }

  async route(input: string): Promise<RouterResponse> {
    // Try intent routing first
    const intentResult = await this.intentRouter.route(input);
    if (checkThreshold(intentResult.confidence, "intent")) {
      return intentResult;
    }

    // Fall back to FAQ
    const faqResult = await this.faqRouter.route(input);
    if (checkThreshold(faqResult.confidence, "faq")) {
      return faqResult;
    }

    // Ultimate fallback
    return this.fallbackRouter.route();
  }
}
