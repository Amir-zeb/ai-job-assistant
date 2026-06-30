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

General HTML Rules (applies to coverLetter.html and email.html)
- Return as an HTML fragment only — no <html>, <head>, or <body>.
- No Markdown, no inline CSS, no headings or section titles.
- Wrap each paragraph in <p> tags.

Scoring Rules
- aiScore: integer 0-100.
- recommendation: APPLY, CONSIDER, or SKIP.
- reason: max 80 words, max 5 items, each max 15 words.

Strengths Rules
- Max 5 items, each max 15 words.
- Only include skills/experience the candidate demonstrably has based on their resume — do not infer or assume.

Missing Skills Rules
- Compare the job description's required and preferred skills directly against the candidate's resume.
- List up to 5 skills/technologies named or implied in the job description that are absent from the candidate's resume.
- Be specific: name the exact technology, tool, or skill (e.g. "GraphQL", "AWS Lambda"), not generic categories (e.g. "cloud experience").
- Do not list a skill if the candidate's resume already shows it, even under a different name (e.g. don't flag "React" if they list "Next.js").
- If the role has no clearly missing skills, suggest adjacent/complementary technologies common in similar roles instead — do not return an empty list.
- reason: max 20 words, must reference why this specific skill matters for this specific role (not generic praise).
- priority: High, Medium, or Low.

Salary Assessment Rules
- Max 40 words.

Cover Letter Rules
- 180-250 words.
- Professional, concise, natural tone — written as an experienced software engineer applying professionally.
- Do NOT copy slogans, hashtags, tracking codes, job IDs, or company values from the job description.
- Do NOT mention that you read the job description or that your resume is attached.
- Do NOT invent facts, skills, or experiences not present in the candidate's resume.
- Do NOT flatter the company, praise its mission/culture, or use exaggerated/emotional language (e.g. "thrilled", "passionate about", "dream company", "honored", "obsessed", "fascinated").
- If referencing the company, mention only concrete facts from the job description (e.g. tech stack, role scope) — never assumed values or culture.
- Focus entirely on how the candidate's actual experience matches the role's actual requirements.
- End the letter with exactly this closing, as the final paragraph: "<p>Sincerely,<br/>Amir Zeb</p>"
- Do not generate any other sign-off (e.g. "Best regards", "Sincerely") — only the one above.

Email Rules
- Subject: max 12 words.
- Body: 80-120 words.
- Do not mention attachments.
- Do not repeat the cover letter content.
- Purpose: introduce the application and prompt the recruiter to review the resume.
- End the letter with exactly this closing, as the final paragraph: "<p>Sincerely,<br/>Amir Zeb</p>"
- Do not generate any other sign-off (e.g. "Best regards", "Sincerely") — only the one above.
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