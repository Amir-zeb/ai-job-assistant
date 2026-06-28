import AiUsage from "@/lib/models/AiUsage";
import type { AiUsageT } from "@/lib/types";

const DAILY_LIMIT = 20;

function getTodayString() {
    return new Date().toISOString().split("T")[0];
}

export async function checkUsage(): Promise<{ usage: AiUsageT & { _id?: any }; remaining: number; limitReached: boolean }> {
    const today = getTodayString();

    let usage = await AiUsage.findOne({ date: today }) as (AiUsageT & { _id?: any }) | null;

    if (!usage) {
        usage = await AiUsage.create({
            date: today,
            count: 0,
        }) as AiUsageT & { _id?: any };
    }

    return {
        usage,
        remaining: DAILY_LIMIT - usage.count,
        limitReached: usage.count >= DAILY_LIMIT,
    };
}

export async function incrementUsage() {
    const today = getTodayString();

    await AiUsage.updateOne(
        { date: today },
        { $inc: { count: 1 } },
        { upsert: true }
    );
}