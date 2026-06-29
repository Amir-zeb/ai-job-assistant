"use client";
import * as React from 'react';
import { JobT } from "@/lib/types";
import Accordion from './accordion';
import ToastMessage from './toast';

type Props = {
    jobDetails: JobT;
};

const JobDetails = ({ jobDetails }: Props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [message, setMessage] = React.useState<string | null>(null);
    const [type, setType] = React.useState<'Error' | 'Success' | 'Warning' | null>(null);

    const analysis = jobDetails?.analysis
    const score = Number(analysis?.aiScore || 0);
    const isAnalyzed = analysis?.isAnalyzed || false;
    const aiReason = analysis?.reason || 'Job not analyzed yet.';
    const strengths = Array.isArray(analysis?.strengths) ? analysis?.strengths.join(', ') : '';
    const missingSkills = analysis?.missingSkills
    const salaryAssessment = analysis?.salaryAssessment;
    const coverLetter = analysis?.coverLetter;

    const getBadgeStyles = () => {
        if (!isAnalyzed) {
            return "bg-gray-100 text-gray-500 border-gray-200";
        }

        if (score >= 80) {
            return "bg-green-100 text-green-700 border-green-200";
        }

        if (score >= 50) {
            return "bg-blue-100 text-blue-700 border-blue-200";
        }

        return "bg-red-100 text-red-600 border-red-200";
    };

    const analyzeJob = async () => {
        try {
            setIsLoading(true);
            setMessage(null);

            const res = await fetch("/api/agent/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    jobId: jobDetails._id,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data?.message || "Failed to analyze job");
            }
            setType('Success')
            setMessage('Job analyzed successfully')
        } catch (error) {
            setType('Error')
            setMessage(error instanceof Error ? error.message : 'Failed to analyze job');
        } finally {
            setIsLoading(false);
        }
    };

    const AiInsight = () => (
        <>
            <p className="text-sm text-gray-700 mb-2">
                {aiReason}
            </p>
            <p className="text-sm text-gray-700 mb-2">
                <strong>Strengths:</strong> {strengths}
            </p>
            <p className="text-sm text-gray-700 mb-2">
                <strong>Missing Skills:</strong>
                <>
                    {Array.isArray(missingSkills) && missingSkills.length ? missingSkills.map(({ skill, priority, reason }, i) => {
                        return <React.Fragment key={i}>
                            <br />
                            <strong>Skill</strong>:{skill}
                            <br />
                            <strong>priority</strong>:{priority}
                            <br />
                            <strong>reason</strong>:{reason}
                            {missingSkills.length > 1 && < hr />}
                        </React.Fragment>
                    }) : 'None'}
                </>
            </p>
            <p className="text-sm text-gray-700 mb-2">
                <strong>Salary Assessment:</strong> {salaryAssessment}
            </p>
            <p className="text-sm text-gray-700">
                <strong>Cover Letter:</strong>
                <br />
            </p>
            <div
                className='mb-2'
                dangerouslySetInnerHTML={{
                    __html: coverLetter || "<p>No description available.</p>",
                }}
            />
            <p className="text-sm text-gray-700">
                <strong>Email:</strong>
            </p>
            <p className="text-sm text-gray-700">
                <strong>Subject:</strong> {analysis?.email?.subject}
            </p>
            <div
                className='mb-2'
                dangerouslySetInnerHTML={{
                    __html: analysis?.email?.body || "<p>No description available.</p>",
                }}
            />
            {/* <div className="text-center mt-10 flex flex-row justify-center gap-1">
                <button
                    className="inline-block text-base text-[12px] px-2 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
                    onClick={() => { }}
                    disabled={isAnalyzed}
                >
                    Cover Letter
                </button>
                <button
                    className="inline-block text-base text-[12px] px-2 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
                    onClick={() => { }}
                    disabled={isAnalyzed}
                >
                    Email
                </button>
            </div> */}
        </>
    )

    const faqItems = [
        ...(isAnalyzed ? [{ title: 'AI Insight', content: AiInsight() }] : []),
        {
            title: 'Job Ad', content: <>
                {/* Job Description */}
                <div className="prose prose-sm max-w-none text-gray-800">
                    <div
                        dangerouslySetInnerHTML={{
                            __html: jobDetails.description || "<p>No description available.</p>",
                        }}
                    />
                </div>

                {/* Apply Button */}
                <div className="text-center mt-10 flex flex-row justify-center gap-1">
                    <a
                        href={jobDetails.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:opacity-90 transition"
                    >
                        View Original Job →
                    </a>
                </div>
            </>
        },
    ];

    return (
        <>
            <div className="flex-1 h-screen overflow-y-auto sticky top-0 bg-gray-50 border-l">
                <div className="max-w-3xl mx-auto p-8">

                    {/* Header Section */}
                    <div className="mb-6">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {jobDetails.title || "-"}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {jobDetails.company || "-"}
                                </p>
                                <p className="text-sm text-gray-400">
                                    {jobDetails.location || "Remote"}
                                </p>
                                {!isAnalyzed && <button
                                    className="inline-block mt-2 px-6 py-2 text-[14px] mb-4 bg-black text-white rounded-lg hover:opacity-90 transition"
                                    onClick={analyzeJob}
                                    disabled={isAnalyzed}
                                >
                                    {isLoading ? "...Server Request" : "Analyze Job"}
                                </button>}
                            </div>

                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full border ${getBadgeStyles()}`}
                            >
                                {isAnalyzed
                                    ? `AI Score: ${score}`
                                    : "Not Rated"}
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t mb-6" />
                    <Accordion items={faqItems} />
                </div>
            </div>
            <ToastMessage message={message} type={type} />
        </>
    );
};

export default JobDetails;