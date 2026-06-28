import { SchemaType } from "@google/generative-ai";

export const jobAnalysisSchema = {
    type: SchemaType.OBJECT,
    properties: {
        aiScore: {
            type: SchemaType.NUMBER,
        },
        recommendation: {
            type: SchemaType.STRING,
        },
        reason: {
            type: SchemaType.STRING,
        },
        strengths: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.STRING,
            },
        },
        missingSkills: {
            type: SchemaType.ARRAY,
            items: {
                type: SchemaType.STRING,
            },
        },
        salaryAssessment: {
            type: SchemaType.STRING,
        },
        coverLetter: {
            type: SchemaType.STRING,
        },
        email: {
            type: SchemaType.OBJECT,
            properties: {
                subject: {
                    type: SchemaType.STRING,
                },
                body: {
                    type: SchemaType.STRING,
                },
            },
        },
    },
    required: [
        "aiScore",
        "recommendation",
        "reason",
        "strengths",
        "missingSkills",
        "salaryAssessment",
        "coverLetter",
        "email",
    ],
};