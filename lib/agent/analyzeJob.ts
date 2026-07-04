import Job from "@/lib/models/Job";
import { analyzeJobWithAI } from "../ai/analyzeJobWithAI";
import { checkUsage, incrementUsage } from "../ai/usage";
import type { JobT, JobAnalysisT } from "@/lib/types";

function normalizeAnalysis(analysis: any): JobAnalysisT {
    return {
        isAnalyzed: true,
        aiScore: Number(analysis?.aiScore ?? 0),
        recommendation: analysis?.recommendation ?? "CONSIDER",
        reason: analysis?.reason ?? "",
        strengths: Array.isArray(analysis?.strengths)
            ? analysis.strengths : [],
        missingSkills: Array.isArray(analysis?.missingSkills)
            ? analysis?.missingSkills : [],
        salaryAssessment: typeof analysis?.salaryAssessment === "string" ? analysis.salaryAssessment : "",
        coverLetter: typeof analysis?.coverLetter === "string"
            ? analysis.coverLetter : "",
        email: {
            subject: typeof analysis?.email?.subject === "string" ? analysis.email.subject : "",
            body: typeof analysis?.email?.body === "string"
                ? analysis.email.body : "",
        },
        analyzedAt: new Date(),
    };
}

export async function analyzeJob(jobId: string): Promise<{ cached: false; analysis: JobAnalysisT } | { message: string; data: JobAnalysisT }> {
    if (!jobId) {
        throw new Error("Job ID is required");
    }

    const { limitReached } = await checkUsage();

    if (limitReached) {
        throw new Error("Daily AI limit reached");
    }

    const job = await Job.findById(jobId);

    if (!job) {
    }

    if (job.analysis?.isAnalyzed) {
        return {
            message: "Already analyzed",
            data: job.analysis,
        };
    }

    // Analyze with AI
    const analysis = await analyzeJobWithAI(job);

    await incrementUsage();

    // Save analysis
    job.analysis = normalizeAnalysis(analysis);

    await job.save();

    return {
        cached: false,
        analysis: job.analysis,
    };
}