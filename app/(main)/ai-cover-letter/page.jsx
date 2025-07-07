
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { getCoverLetters } from "@/actions/coverletter";
// i will display all the current cover letters on this page
async function AICoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-4xl leading-20 lg:text-6xl font-bold custom-gradient">
          My Cover Letters
        </h1>
        <Link href="/ai-cover-letter/new-cover-letter">
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </Link>
      </div>
      <div id="my-cover-letters">
        {coverLetters?.data?.length > 0 ? (
          coverLetters.data.map((coverLetter) => (
            <div
              key={coverLetter.id}
              className="border p-4 mb-4 rounded-lg hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold">
                {coverLetter.jobTitle} at {coverLetter.companyName}
              </h2>
              <p className="text-gray-600">
                {new Date(coverLetter.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/ai-cover-letter/${coverLetter.id}`}
                className="text-blue-500 hover:underline mt-2 inline-block"
              >
                View Cover Letter
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No cover letters found.</p>
        )}
      </div>
    </div>
  );
}

export default AICoverLetterPage;
