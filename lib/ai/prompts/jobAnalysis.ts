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
  "strengths": string[],
  "missingSkills": string[],
  "salaryAssessment": string,
  "coverLetter": string,
  "email": {
    "subject": string,
    "body": string
  }
}
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