import { getResume } from "@/actions/resume"
import ResumeBuilder from "./_components/resume-builder";

// this is a server side static page but i want to make it 
// dynamic so that it can fetch the latest resume content
// here we are using this to force the page to be dynamic
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