import { JobT } from "@/lib/types";
import { CANDIDATE_PROFILE } from "../profile";

const TASK = `
Your task is to evaluate whether this job is a good match for the candidate.

Evaluate:
1. Overall compatibility
2. Required skills vs candidate skills
3. Missing skills the candidate should learn
4. Salary competitiveness (if salary is provided)
5. Whether the candidate should apply

Then generate:
- AI Score (0-100)
- Recommendation
- Short reason
- Strengths
- Missing skills
- Salary assessment
- Professional cover letter
- Professional email draft
`;

const OUTPUT_FORMAT = `
Return ONLY valid JSON.

{
  "aiScore": number,
  "recommendation": "APPLY" | "CONSIDER" | "SKIP",
  "reason": string,
  "strengths": [
    string
  ],
  "missingSkills": [
    {
      "skill": string,
      "priority": "High" | "Medium" | "Low",
      "reason": string,
    }
  ],
  "salaryAssessment": string,
  "coverLetter": {
    "html": string
  },
  "email": {
    "subject": string,
    "html": string
  }
}

Rules

- aiScore: Integer between 0 and 100.
- recommendation: Must be APPLY, CONSIDER, or SKIP.
- reason: Maximum 80 words.
- strengths: Maximum 5 items. Each item maximum 15 words.
- missingSkills: Maximum 5 items. Only include skills that would significantly improve the candidate's chances.
- priority: High, Medium, or Low.
- missingSkills.reason: Maximum 20 words.
- salaryAssessment: Maximum 40 words.

Cover Letter Rules
- 180-250 words.
- Return as HTML fragment only.
- Wrap each paragraph in <p> tags.
- Do not include <html>, <head>, or <body>.
- Do not use Markdown.
- No inline CSS.

Email Rules
- Subject maximum 12 words.
- Body 80-120 words.
- Return as HTML fragment only.
- Wrap each paragraph in <p> tags.
- Do not include <html>, <head>, or <body>.
- Do not use Markdown.
- No inline CSS.
`;

export function buildJobAnalysisPrompt(job: JobT) {
  return `
${CANDIDATE_PROFILE}

${TASK}

${OUTPUT_FORMAT}

Job Information

Title:
${job.title}

Company:
${job.company}

Location:
${job.location}

Salary:
${job.salary || "Not provided"}

Description:
${job.description}
`;
}