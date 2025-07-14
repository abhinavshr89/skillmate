"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

function InsightsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const chartVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen py-20 px-5 "
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Analytics Visualization - Left Side */}
          <motion.div variants={chartVariants} className="space-y-8">
            
            {/* Skills Demand Chart */}
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Skills in Demand</h3>
              <div className="space-y-4">
                {[
                  { skill: "AI/ML", percentage: 95, color: "from-purple-500 to-pink-500" },
                  { skill: "React", percentage: 88, color: "from-blue-500 to-cyan-500" },
                  { skill: "Cloud", percentage: 82, color: "from-emerald-500 to-green-500" },
                  { skill: "Python", percentage: 76, color: "from-orange-500 to-red-500" }
                ].map((item, index) => (
                  <motion.div
                    key={item.skill}
                    className="space-y-2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between text-gray-300">
                      <span>{item.skill}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1.5, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Market Trends Chart */}
            <div className="bg-gradient-to-br from-slate-800/50 to-purple-900/20 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Market Trends</h3>
              <div className="relative h-48 flex items-end justify-between">
                {[65, 78, 82, 89, 94, 88, 96].map((height, index) => (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-t from-purple-600 to-pink-400 rounded-t-lg w-8"
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ 
                      duration: 1.2, 
                      delay: index * 0.15,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                    whileHover={{ scale: 1.1 }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-4">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month) => (
                  <span key={month}>{month}</span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Content - Right Side */}
          <motion.div variants={itemVariants} className="space-y-8 ">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text leading-tight ">
                Get AI-Powered Real-Time Industry Insights
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Access live market data, trending skills, and career opportunities updated in real-time. Make informed decisions about your career path with AI-driven analytics.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Live Market Data</h4>
                  <p className="text-gray-400">Track job market trends and salary insights as they happen</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-pink-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Skill Demand Analytics</h4>
                  <p className="text-gray-400">Discover which skills are trending in your industry</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-3"></div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Career Opportunities</h4>
                  <p className="text-gray-400">Get notified about relevant job openings and career paths</p>
                </div>
              </div>
            </div>


              <Button
                size="lg"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg font-semibold"
              >
                Get Your Insights Now
              </Button>
            
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}

export default InsightsPage;