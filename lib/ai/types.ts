export type JobAnalysisResult = {
    aiScore: number;
    recommendation: "APPLY" | "CONSIDER" | "SKIP";
    reason: string;
    strengths: string[];
    missingSkills: string[];
    salaryAssessment: string;
    coverLetter: string;
    email: {
        subject: string;
        body: string;
    };
};