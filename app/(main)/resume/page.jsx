import { getResume } from "@/actions/resume"
import ResumeBuilder from "./_components/resume-builder";

export const dynamic = 'force-dynamic';

async function ResumePage() {
  const resume = await getResume();
  
  console.log("Fetched resume:", resume?.content?.substring(0, 100) + "...");
    
  return (
    <div>
      <ResumeBuilder initialContent={resume?.content}/>
    </div>
  )
}

export default ResumePage