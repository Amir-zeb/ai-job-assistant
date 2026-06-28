import Job from "@/lib/models/Job";
import { analyzeJobWithAI } from "../ai/analyzeJobWithAI";
import { checkUsage, incrementUsage } from "../ai/usage";
import type { JobT, JobAnalysisT } from "@/lib/types";

export async function analyzeJob(jobId: string): Promise<{ cached: false; analysis: JobAnalysisT } | { message: string; data: JobAnalysisT }> {
    if (!jobId) {
        throw new Error("Job ID is required");
    }

    const { limitReached } = await checkUsage();

    if (limitReached) {
        throw new Error("Daily AI limit reached");
    }

    const job = await Job.findById(jobId) as (JobT & { save: () => Promise<any>; analysis?: JobAnalysisT }) | null;

    if (!job) {
        throw new Error("Job not found");
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
    job.analysis = {
        ...analysis,
        isAnalyzed: true,
        analyzedAt: new Date(),
    };

    await job.save();

    return {
        cached: false,
        analysis: job.analysis,
    };
}