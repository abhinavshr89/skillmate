import { Inngest } from "inngest";

export const inngest = new Inngest({ id: "skillmate", name:"Skillmate",
    credentials:{
        gemini:{
            apiKey: process.env.GEMINI_API_KEY
        }
    }
 });
