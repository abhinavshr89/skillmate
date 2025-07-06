import { getIndustryInsights } from "@/actions/dashboard";
import { getUserOnboardingStatus } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
import DashboadView from "./_components/dashboard-view";

async function IndustryInsightsPage() {
  const { isOnboarded } = await getUserOnboardingStatus();
  const insights = await getIndustryInsights();
  console.log("Insights fetched:", insights);
  
  

  if (!isOnboarded) {
    redirect("/onboarding");
  }

  return (
    <div className="container mx-auto">
      <DashboadView insights={insights} />
    </div>
  );
}

export default IndustryInsightsPage;
