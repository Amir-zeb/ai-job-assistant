export type JobAnalysisT = {
    isAnalyzed: boolean;
    aiScore: number;
    recommendation: string;
    reason: string;
    strengths: string[];
    missingSkills?: MissingSkillT[];
    salaryAssessment: string;
    coverLetter: string;
    email: {
        subject: string;
        body: string;
    };
    analyzedAt?: Date;
};

export type MissingSkillT = {
    skill: string;
    priority: "High" | "Medium" | "Low";
    reason: string;
};

export type JobT = {
    _id: string;
    title: string;
    company: string;
    location: string;
    salary: string;
    salaryMin: string;
    salaryMax: string;
    url: string;
    postDate: Date;
    description: string;
    source: string;

    ruleBasedScore: number;
    isRelevant: boolean;

    createdAt: Date;

    analysis?: JobAnalysisT;
};
export type AiUsageT = {
    _id: string,
    count: number,
    date: string,
}
