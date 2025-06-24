import thresholds from "../config/thresholds.json";

export function checkThreshold(
  confidence: number,
  type: "intent" | "faq"
): boolean {
  return confidence >= thresholds[type];
}
