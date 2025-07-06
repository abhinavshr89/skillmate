import React from 'react'
import { industries } from '@/data/industries';
import { getUserOnboardingStatus } from '@/actions/user';
import { redirect } from 'next/navigation';
import OnboardingForm from './_components/onboarding-form';

async function OnBoardingPage() {
  const {isOnboarded} = await getUserOnboardingStatus();
  if(isOnboarded) {
    redirect("/dashboard");
  }
  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnBoardingPage