import { embedText } from "../../utils/embeddings";

export async function calculateSimilarity(
  input: string,
  examples: string[]
): Promise<number> {
  const inputEmbedding = await embedText(input);
  const exampleEmbeddings = await Promise.all(examples.map(embedText));

  const similarities = exampleEmbeddings.map((emb) =>
    cosineSimilarity(inputEmbedding, emb)
  );

  return Math.max(...similarities);
}

function cosineSimilarity(a: number[], b: number[]) {
  // Implementation omitted for brevity
}
