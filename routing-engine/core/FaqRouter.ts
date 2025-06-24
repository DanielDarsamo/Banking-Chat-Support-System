import { VectorStore } from "../../db/vector/client";
import { RouterResponse } from "../types/types";

export class FaqRouter {
  private vectorStore: VectorStore;

  constructor(vectorStore: VectorStore) {
    this.vectorStore = vectorStore;
  }

  async route(query: string): Promise<RouterResponse> {
    const results = await this.vectorStore.similaritySearch(query, 3);

    return {
      type: "faq",
      confidence: results[0].score,
      response: results[0].content,
      metadata: {
        source: "faq.json",
        references: results.slice(0, 3),
      },
    };
  }
}
