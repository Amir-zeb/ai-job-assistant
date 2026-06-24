// app/lib/ruleBasedAnalysis/relevance.ts

const RELEVANT_PATTERNS = [
    /\bjavascript\b/i,
    /\becmascript\b/i,
    /\btypescript\b/i,

    /\breact\b/i,
    /\breact\.?js\b/i,

    /\bnext\.?js\b/i,

    /\bnode\.?js\b/i,

    /\bnest\.?js\b/i,

    /\bexpress\.?js\b/i,
    /\bexpress\b/i,

    /\bmongodb\b/i,
    /\bpostgres\b/i,
    /\bpostgresql\b/i,
    /\bmysql\b/i,

    /\bmern\b/i,
    /\bfull[- ]stack\b/i,
    /\bfrontend\b/i,
    /\bbackend\b/i,
];

export function relevance(description: string): boolean {
    return RELEVANT_PATTERNS.some((pattern) => pattern.test(description));
}