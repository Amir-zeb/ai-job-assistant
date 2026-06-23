// app/lib/ruleBasedAnalysis/relevance.ts

export function relevance(description: string): Boolean {
    const lower = description.toLowerCase();

    const hasRelevantStack =
        lower.includes("javascript") ||
        lower.includes("typescript") ||
        lower.includes("react") ||
        lower.includes("next") ||
        lower.includes("node") ||
        lower.includes("nest") ||
        lower.includes("mongodb") ||
        lower.includes("postgresql") ||
        lower.includes("sql") ||
        lower.includes("express");

    return hasRelevantStack
}