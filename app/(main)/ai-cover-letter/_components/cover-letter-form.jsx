"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { generateAICoverLetter } from "@/actions/coverletter";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { coverLetterSchema } from "@/lib/schema";
import useFetch from "@/hooks/use-fetch";
import MDEditor from "@uiw/react-md-editor";
import { Save } from "lucide-react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { saveCoverLetter } from "@/actions/coverletter";

function CoverLetterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
    defaultValues: {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      name: "",
    },
  });
  const {
    data: coverLetter,
    loading,
    error,
    fn: generateCoverLetter,
    setData,
  } = useFetch(generateAICoverLetter);

  // const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Store form data for saving
  const [formData, setFormData] = useState(null);

  const onSubmit = async (data) => {
    try {
      console.log("Submitting cover letter data:", data);
      setFormData(data); // Store form data for later use
      await generateCoverLetter(data);
      console.log("Generated cover letter:", coverLetter);
      // Don't reset here to keep form data for saving
    } catch (error) {
      console.error("Error generating cover letter:", error);
    }
  };

  // const generatePDF = async () => {
  //   if (!coverLetter) {
  //     toast.error("No cover letter to download");
  //     return;
  //   }

  //   setIsGenerating(true);
  //   try {
  //     const element = document.getElementById("coverletter-pdf");

  //     if (!element) {
  //       console.error("Cover letter element not found");
  //       return;
  //     }

  //     const opt = {
  //       margin: [10, 10, 10, 10],
  //       filename: `${formData?.name || "cover-letter"}_${
  //         formData?.companyName || "application"
  //       }.pdf`,
  //       image: { type: "jpeg", quality: 0.98 },
  //       html2canvas: {
  //         scale: 2,
  //         useCORS: true,
  //         allowTaint: true,
  //       },
  //       jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //       pagebreak: { mode: "avoid-all" },
  //     };

  //     await html2pdf().set(opt).from(element).save();
  //     toast.success("PDF downloaded successfully!");
  //   } catch (error) {
  //     console.error("PDF generation error:", error);
  //     toast.error("Failed to generate PDF");
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleSave = async () => {
    if (!coverLetter || !formData) {
      toast.error("No cover letter generated to save.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveCoverLetter(
        coverLetter,
        formData.companyName,
        formData.jobTitle,
        formData.jobDescription
      );

      if (result.success) {
        toast.success("Cover letter saved successfully!");
      } else {
        toast.error(result.error || "Failed to save cover letter");
      }
    } catch (error) {
      console.error("Error saving cover letter:", error);
      toast.error("Failed to save cover letter.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div data-color-mode="light">
      {coverLetter && (
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Generated Cover Letter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <MDEditor
                value={coverLetter}
                preview="preview"
                hideToolbar
                visibleDragBar={false}
                height={600}
              />
            </div>
            <div className="mt-4 flex justify-end gap-4">
              {/* Remove Download button */}
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Remove the hidden PDF element */}

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Job Details</CardTitle>
          <CardDescription>
            Provide information about the position you are applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              {/* users name */}
              <div className="flex w-full justify-between gap-3">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl">Name</h3>
                  <Input placeholder="Enter your name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex w-full justify-between gap-3">
                <div className="flex-1">
                  <h3 className="mb-2 text-xl">Company Name</h3>
                  <Input
                    placeholder="Enter company name"
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl">Job Title</h3>
                  <Input
                    placeholder="Enter job title"
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>

              {/* job description */}
              <div>
                <h3 className="mb-2 text-xl">Job Description</h3>
                <Textarea
                  placeholder="Enter job description"
                  {...register("jobDescription")}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Generating..." : "Generate Cover Letter"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CoverLetterForm;
                  <h3 className="mb-2 text-xl">Company Name</h3>
                  <Input
                    placeholder="Enter company name"
                    {...register("companyName")}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm">
                      {errors.companyName.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl">Job Title</h3>
                  <Input
                    placeholder="Enter job title"
                    {...register("jobTitle")}
                  />
                  {errors.jobTitle && (
                    <p className="text-red-500 text-sm">
                      {errors.jobTitle.message}
                    </p>
                  )}
                </div>
              </div>

              {/* job description */}
              <div>
                <h3 className="mb-2 text-xl">Job Description</h3>
                <Textarea
                  placeholder="Enter job description"
                  {...register("jobDescription")}
                />
                {errors.jobDescription && (
                  <p className="text-red-500 text-sm">
                    {errors.jobDescription.message}
                  </p>
                )}
              </div>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? "Generating..." : "Generate Cover Letter"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CoverLetterForm;
