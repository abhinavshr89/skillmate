"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "./Footer";
import InsightsPage from "./insightsPage";

const HeroSection = () => {
  const imageRef = useRef(null);

  // Hero animations
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.3,
      },
    },
  };

  const heroTextVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const heroSubtextVariants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <motion.section
        className="w-full pt-36 md:pt-48 pb-10 min-h-screen px-5 relative overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={heroContainerVariants}
      >
        {/* Floating background elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 blur-xl"
          variants={floatingVariants}
          animate="animate"
        />
        <motion.div
          className="absolute top-40 right-16 w-32 h-32 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-15 blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-400 rounded-full opacity-10 blur-xl"
          variants={floatingVariants}
          animate="animate"
          transition={{ delay: 2 }}
        />

        <div className="space-y-6 text-center relative z-10">
          <div className="space-y-6 mx-auto">
            <motion.h1
              className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-indigo-100 via-purple-500 to-pink-500 text-transparent bg-clip-text"
              variants={heroTextVariants}
            >
              Your AI Career Coach for
              <br />
              Professional Success
            </motion.h1>

            <motion.p
              className="mx-auto max-w-[600px] text-muted-foreground md:text-xl"
              variants={heroSubtextVariants}
            >
              Advance your career with personalized guidance, interview prep,
              and AI-powered tools for job success.
            </motion.p>
          </div>

          <motion.div
            className="flex justify-center space-x-4"
            variants={buttonVariants}
          >
            <Link href="/dashboard">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" className="px-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Get Started
                </Button>
              </motion.div>
            </Link>
            <Link href="#">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button size="lg" variant="outline" className="px-8 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                  Watch Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </motion.section>
      <motion.section
        className="min-h-screen flex items-center justify-center "
        initial="hidden"
        whileInView="visible" // Triggers animation when element enters viewport
        viewport={{ once: true, amount: 0.3 }} // Animation config
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-28 px-5">
          <motion.div variants={cardVariants}>
            <Card className="max-h-[400px] hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
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
                  Take personalized quizzes powered by AI that adapt to your
                  skill level. Get instant feedback, track your progress, and
                  identify areas for improvement in your professional journey.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/interview">
                  <Button className="w-full">Start Quiz</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="max-h-[400px] hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
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
                  Create stunning, ATS-friendly resumes in minutes. Our AI helps
                  you craft compelling content, choose the right format, and
                  highlight your achievements to stand out to employers.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="/resume">
                  <Button className="w-full">Build Resume</Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div variants={cardVariants}>
            <Card className="max-h-[400px] mb-3 hover:shadow-lg transition-shadow bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20">
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
          </motion.div>
        </div>
      </motion.section>
      <motion.section className="min-h-screen">
        <InsightsPage/>
      </motion.section>
      <Footer />
    </>
  );
};

export default HeroSection;
