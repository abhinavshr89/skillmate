"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAIInsights = async (industry) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `,
  });
  const cleanedText = response.text.replace(/```(?:json)?\n?/g, "").trim();
  return JSON.parse(cleanedText);
};



// This function is verifying if the user exists 
// then takes the user.industry to find the details of the 
// industry from the database table industryInsight
// Note -> in prisma the database tables are in camelCase
// IndustryInsight is the table name -> db.industryInsight

export async function getIndustryInsights() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  
  const industryInsight = await db.industryInsight.findFirst({
    where: { industry: user.industry },
  });

  return industryInsight;
}
