import Job from "@/lib/models/Job";

export async function analyzeJob(jobId: string) {
    if (!jobId) {
        throw new Error("Job ID is required");
    }

    const job = await Job.findById(jobId);

    if (!job) {
        throw new Error("Job not found");
    }

    if (job.analysis?.isAnalyzed) {
        return {
            message: "Already analyzed",
            data: job.analysis,
        };
    }

    return {
        message: "Job loaded successfully",
        data: job,
    };
}