"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background z-0" />

      {/* Subtle Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-[10%] w-64 h-64 rounded-full bg-primary/5"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Star className="h-4 w-4 mr-2" />
              AI-Powered Resume Review
            </div>

            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Get Your Resume <span className="gradient-text">Reviewed</span> by
              AI
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Receive instant, personalized feedback to improve your resume and
              land your dream job.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link href="/review">
                <Button
                  size="lg"
                  className="h-12 px-8 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Review My Resume
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative mx-auto max-w-[600px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-500/20 rounded-2xl backdrop-blur-sm transform rotate-2" />

              <div className="relative bg-background/80 backdrop-blur-sm border border-primary/20 rounded-2xl p-8 shadow-xl">
                <div className="flex justify-center mb-6">
                  <div className="relative w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </div>

                <div className="space-y-6 text-center">
                  <h2 className="text-2xl font-bold">Resume Analysis</h2>
                  <p className="text-muted-foreground">
                    Upload your resume and get instant AI-powered feedback
                    tailored to your target job role.
                  </p>
                  <Link href="/review" className="w-full block">
                    <Button className="w-full">Start Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
