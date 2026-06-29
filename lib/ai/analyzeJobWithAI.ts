import { JobT } from "@/lib/types";
import { JobAnalysisT } from "../types";
import { buildJobAnalysisPrompt } from "./prompts/jobAnalysis";
import { generateJson } from "./gemini";
import { jobAnalysisSchema } from "./schemas/jobAnalysis";
import { Schema } from "@google/generative-ai";

export async function analyzeJobWithAI(
    job: JobT
): Promise<JobAnalysisT> {
    const prompt = buildJobAnalysisPrompt(job);
    return await generateJson<JobAnalysisT>(
        prompt,
        jobAnalysisSchema as Schema
    );
}