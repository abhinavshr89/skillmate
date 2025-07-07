"use server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { format } from "date-fns";
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateAICoverLetter = async ({
  companyName,
  jobTitle,
  jobDescription,
  name,
}) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const currentDate = new Date();
  const formattedDate = format(currentDate, "yyyy-MM-dd");

  const prompt = `
Generate a professional cover letter in **Markdown** format for the position of **${jobTitle}** at **${companyName}** based on the following job description:

${jobDescription}

Details to include:
- Applicant's name: **${name}**
- Current date: **${formattedDate}**

**Cover Letter Requirements:**
- Professional, concise, and tailored to the job description
- Highlight relevant skills, experience, and enthusiasm for the role
- Approximately 3–4 well-structured paragraphs

**Formatting Instructions:**
- Use ## for the heading (e.g., "## Cover Letter")
- Use **bold** to emphasize key details such as company name, position title, and essential skills
- Include the following sections:
  - **Date**
  - **To:** (Recipient)
  - **Company**
  - **Position**
  - **Subject**
  - **Body paragraphs**
  - **Closing with applicant's name**

**Example structure:**

## Cover Letter

**Date:** ${formattedDate}

**To:** Hiring Manager  
**Company:** ${companyName}  
**Position:** ${jobTitle}  

**Subject:** Application for ${jobTitle} Position

Dear Hiring Manager,

[Opening paragraph: Express enthusiasm and introduce yourself]

[Second paragraph: Highlight relevant experience and key skills]

[Third paragraph: Align your background with the job requirements]

[Closing paragraph: Express gratitude and include a call to action]

Sincerely,  
${name}

👉 Return **only the markdown-formatted cover letter** without any extra text or explanations.
`;

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error generating cover letter:", error);
    throw new Error("Failed to generate cover letter");
  }
};

// this function will take the generated cover letter, company Name, jobtitle and job description and save it
// to the database for the user
export const saveCoverLetter = async (
  content,
  companyName,
  jobTitle,
  jobDescription
) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const coverLetter = await db.coverLetter.create({
      data: {
        userId: user.id,
        content,
        companyName,
        jobTitle,
        jobDescription,
        status: "completed",
      },
    });

    return {
      success: true,
      message: "Cover letter saved successfully.",
      id: coverLetter.id,
    };
  } catch (error) {
    console.error("Error saving cover letter:", error);
    return { success: false, error: error.message || "An error occurred." };
  }
};

export const getCoverLetters = async () => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const coverLetters = await db.coverLetter.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: coverLetters };
  } catch (error) {
    console.error("Error fetching cover letters:", error);
    return { success: false, error: error.message || "An error occurred." };
  }
};

export const getCoverLetterById = async (id) => {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const coverLetter = await db.coverLetter.findUnique({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!coverLetter) throw new Error("Cover letter not found");

    return coverLetter;
  } catch (error) {
    console.error("Error fetching cover letter:", error);
    throw new Error(
      error.message || "An error occurred while fetching the cover letter."
    );
  }
};
