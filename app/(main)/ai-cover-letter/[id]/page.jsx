"use client";
import React, { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import useFetch from "@/hooks/use-fetch";
import { getCoverLetterById } from "@/actions/coverletter";
import { Loader2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";

function CoverLetter({ params }) {
  const coverLetterId = params.id;

  const {
    data: coverLetter,
    loading,
    error,
    fn: fetchCoverLetter,
  } = useFetch(getCoverLetterById);

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (coverLetterId) {
      fetchCoverLetter(coverLetterId);
    }
  }, [coverLetterId]); // Only depend on coverLetterId

  const generatePDF = async () => {
    if (!coverLetter) {
      toast.error("No cover letter to download");
      return;
    }

    setIsGenerating(true);
    try {
      const element = document.getElementById("coverletter-pdf");

      if (!element) {
        console.error("Cover letter element not found");
        return;
      }

      const opt = {
        margin: [10, 10, 10, 10],
        filename: `${coverLetter.jobTitle}_${coverLetter.companyName}_cover_letter.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          allowTaint: true,
        },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: "avoid-all" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF downloaded successfully!");
    } catch (error) {
      console.error("PDF generation error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading cover letter...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>Error loading cover letter: {error.message}</p>
      </div>
    );
  }

  return (
    <div data-color-mode="light" className="space-y-4">
      {coverLetter && (
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {coverLetter.jobTitle} at {coverLetter.companyName}
            </h1>
            <p className="text-gray-600">
              Created on {new Date(coverLetter.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Button
            variant="destructive"
            onClick={generatePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </>
            )}
          </Button>
        </div>
      )}

      <div className="border rounded-lg">
        <MDEditor
          value={coverLetter?.content || "No cover letter data available"}
          preview="preview"
          hideToolbar
          visibleDragBar={false}
          height={600}
        />
      </div>

      {/* Hidden element for PDF generation */}
      {coverLetter && (
        <div
          style={{
            position: "absolute",
            left: "-9999px",
            top: "-9999px",
          }}
        >
          <div
            id="coverletter-pdf"
            style={{
              width: "210mm",
              minHeight: "297mm",
              padding: "20mm",
              margin: "0",
              background: "white",
              color: "black",
              fontSize: "12pt",
              lineHeight: "1.4",
            }}
          >
            <MDEditor.Markdown
              source={coverLetter.content}
              style={{
                background: "white",
                color: "black",
                fontFamily: "Arial, sans-serif",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetter;
