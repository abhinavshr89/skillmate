"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section className="w-full pt-36 md:pt-48 pb-10 min-h-screen px-5">
        <div className="space-y-6 text-center">
          <div className="space-y-6 mx-auto">
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl  bg-gradient-to-r from-indigo-100 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Your AI Career Coach for
              <br />
              Professional Success
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
              Advance your career with personalized guidance, interview prep,
              and AI-powered tools for job success.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Get Started
              </Button>
            </Link>
            <Link href="#">
              <Button size="lg" variant="outline" className="px-8">
                Watch Demo
              </Button>
            </Link>
          </div>
          {/* <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src="/banner.jpg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div> */}
        </div>
      </section>
      <section className="min-h-screen flex items-center justify-center ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-28 px-5">
          <Card className="max-h-[400px] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl custom-gradient">
                AI-Powered Quizzes
              </CardTitle>
              <CardDescription>
                Test your knowledge with intelligent assessments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Take personalized quizzes powered by AI that adapt to your skill
                level. Get instant feedback, track your progress, and identify
                areas for improvement in your professional journey.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/interview">
                <Button className="w-full">Start Quiz</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="max-h-[400px] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl custom-gradient">
                Resume Generator
              </CardTitle>
              <CardDescription>
                Build professional resumes with AI support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Create stunning, ATS-friendly resumes in minutes. Our AI helps you
                craft compelling content, choose the right format, and highlight
                your achievements to stand out to employers.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/resume">
                <Button className="w-full">Build Resume</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="max-h-[400px] hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl custom-gradient">
                Cover Letter Generator
              </CardTitle>
              <CardDescription>
                Generate personalized cover letters instantly
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Write compelling cover letters tailored to specific job
                opportunities. Our AI analyzes job descriptions and creates
                personalized content that showcases your skills and experience
                perfectly.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/ai-cover-letter">
                <Button className="w-full">Create Cover Letter</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      <section className="min-h-screen ">

      </section>
    </>
  );
};

export default HeroSection;
