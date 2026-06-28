import { JobT } from "@/lib/types";
import { JobAnalysisResult } from "./types";
import { buildJobAnalysisPrompt } from "./prompts/jobAnalysis";
import { generateJson } from "./gemini";
import { jobAnalysisSchema } from "./schemas/jobAnalysis";
import { Schema } from "@google/generative-ai";

export async function analyzeJobWithAI(
    job: JobT
): Promise<JobAnalysisResult> {
    const prompt = buildJobAnalysisPrompt(job);

    return await generateJson<JobAnalysisResult>(
        prompt,
        jobAnalysisSchema as Schema
    );
}