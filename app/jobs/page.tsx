import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { JobT } from "@/lib/types";

import JobList from "./_components/jobList";
import Link from "next/link";

export default async function JobsPage() {
    await connectDB();
    const jobs = await Job.find()
        .sort({
            aiRated: -1,
            aiScore: -1,
            isRelevant: -1,
            ruleBasedScore: -1,
            postDate: -1,
        })
        .lean();

    // Convert ObjectId to string
    const formattedJobs: JobT[] = jobs.map((job: any) => ({
        ...job,
        _id: job._id.toString(),
        analysis: {
            ...job.analysis,
            missingSkills:
                Array.isArray(job.analysis?.missingSkills) && job.analysis?.missingSkills.length
                    ? job.analysis?.missingSkills?.map(
                        ({ _id, ...skill }: any) => skill
                    ) : [],
        },
    }));

    return (
        <div className="min-h-screen relative">
            <div className="text-2xl p-2 border-b border-(--primary)">
                <Link href="/">
                    <span className="text-(--primary)">Dashboard</span>
                </Link>
            </div>
            <JobList jobs={formattedJobs} />
        </div>
    );
}