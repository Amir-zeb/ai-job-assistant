export type AIResponse = {
    isRelevant: boolean;
    score: number;
    requestUsed: boolean;
    reason: string;
};

export function safeParseJSON(text: string): AIResponse {
    try {
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No JSON found");
        }

        const parsed = JSON.parse(jsonMatch[0]);

        return {
            score: parsed.score ?? 0,
            isRelevant: parsed.isRelevant ?? false,
            reason: parsed.reason ?? "Invalid AI response",
            requestUsed: true,
        };
    } catch {
        return {
            score: 0,
            isRelevant: false,
            reason: "Invalid AI response",
            requestUsed: true,
        };
    }
}