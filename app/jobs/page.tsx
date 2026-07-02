import { connectDB } from "@/lib/db";
import Job from "@/lib/models/Job";
import { JobT } from "@/lib/types";

import JobList from "./_components/jobList";
import Link from "next/link";
import Header from "./_components/header";

export const dynamic = "force-dynamic";

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
            <Header />
            <JobList jobs={formattedJobs} />
            <div className="fixed bottom-4 right-4">
                <Link href="/jobs/create" className="bg-(--secondary) text-(--primary) px-4 py-2 rounded shadow"
                    title="Add a new job"
                >
                    +
                </Link>
            </div>
        </div>
    );
}