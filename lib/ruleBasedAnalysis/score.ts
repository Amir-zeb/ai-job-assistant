// app/lib/ruleBasedAnalysis/score.ts
export function calculateScore(description: string): number {
    const text = description.toLowerCase();

    let score = 0;

    // Core stack (high value)
    if (text.includes("react")) score += 20;
    if (text.includes("next")) score += 20;
    if (text.includes("node")) score += 15;
    if (text.includes("typescript")) score += 15;
    if (text.includes("mongodb")) score += 10;

    // Positive signals
    if (text.includes("remote")) score += 10;
    if (text.includes("full stack")) score += 10;
    if (text.includes("senior")) score += 10;

    // Negative filters
    if (text.includes("php")) score -= 20;
    if (text.includes("python")) score -= 20;
    if (text.includes(".net")) score -= 20;
    if (text.includes("wordpress")) score -= 15;
    if (text.includes("laravel")) score -= 20;

    return Math.max(0, Math.min(100, score));
}

export function isInterestJob(score: number): boolean {
    return score >= 60;
}