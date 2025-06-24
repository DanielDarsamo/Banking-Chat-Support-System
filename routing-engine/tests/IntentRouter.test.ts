import { IntentRouter } from "../IntentRouter";

const mockIntents = [
  {
    intent: "reset_pin",
    examples: ["How to reset PIN", "I forgot my PIN"],
    responses: ["You can reset your PIN..."],
  },
];

describe("IntentRouter", () => {
  it("should route to matching intent", async () => {
    const router = new IntentRouter(mockIntents);
    const result = await router.route("I need to reset my PIN code");
    expect(result.type).toBe("intent");
    expect(result.intent).toBe("reset_pin");
  });
});
