// app/lib/ruleBasedAnalysis/score.ts
const POSITIVE_RULES = [
  { pattern: /\breact\b/i, score: 20 },
  { pattern: /\breact\.?js\b/i, score: 20 },

  { pattern: /\bnext\.?js\b/i, score: 20 },

  { pattern: /\bnode\.?js\b/i, score: 15 },

  { pattern: /\btypescript\b/i, score: 15 },

  { pattern: /\bmongodb\b/i, score: 10 },

  { pattern: /\bexpress\.?js\b/i, score: 10 },

  { pattern: /\bnest\.?js\b/i, score: 10 },

  { pattern: /\bpostgres\b/i, score: 8 },
  { pattern: /\bpostgresql\b/i, score: 8 },

  { pattern: /\bmysql\b/i, score: 5 },

  { pattern: /\bgraphql\b/i, score: 5 },

  { pattern: /\bdocker\b/i, score: 5 },

  { pattern: /\bkubernetes\b/i, score: 5 },

  { pattern: /\baws\b/i, score: 5 },

  { pattern: /\bazure\b/i, score: 3 },

  { pattern: /\bgcp\b/i, score: 3 },

  { pattern: /\bremote\b/i, score: 10 },

  { pattern: /\bfull[- ]stack\b/i, score: 10 },

  { pattern: /\bfrontend\b/i, score: 8 },

  { pattern: /\bbackend\b/i, score: 8 },

  { pattern: /\bsenior\b/i, score: 10 },

  { pattern: /\bmid[- ]level\b/i, score: 5 },

  { pattern: /\bmern\b/i, score: 20 },
];

const NEGATIVE_RULES = [
  { pattern: /\bphp\b/i, score: -20 },
  { pattern: /\blaravel\b/i, score: -20 },
  { pattern: /\bwordpress\b/i, score: -15 },

  { pattern: /\bdjango\b/i, score: -15 },
  { pattern: /\bflask\b/i, score: -15 },

  { pattern: /\bpython\b/i, score: -20 },

  { pattern: /\basp\.?net\b/i, score: -20 },
  { pattern: /\b\.net\b/i, score: -20 },

  { pattern: /\bc#\b/i, score: -20 },

  { pattern: /\bruby\b/i, score: -15 },
  { pattern: /\brails\b/i, score: -15 },

  { pattern: /\bjava\b/i, score: -10 },
];

export function calculateScore(description: string): number {
  let score = 0;

  for (const rule of POSITIVE_RULES) {
    if (rule.pattern.test(description)) {
      score += rule.score;
    }
  }

  for (const rule of NEGATIVE_RULES) {
    if (rule.pattern.test(description)) {
      score += rule.score;
    }
  }

  return Math.max(0, Math.min(100, score));
}

export function isInterestJob(score: number): boolean {
  return score >= 60;
}