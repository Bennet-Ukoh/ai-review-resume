"use client";

import { FileText, Zap, Star } from "lucide-react";
import StepCard from "../step-card";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      icon: <FileText className="h-6 w-6 text-primary" />,
      title: "Upload",
      description: "Paste text or upload a PDF resume",
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Select Role",
      description: "Choose your target job position",
    },
    {
      icon: <Star className="h-6 w-6 text-primary" />,
      title: "Get Feedback",
      description: "Receive instant AI analysis",
    },
  ];

  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            <span className="gradient-text">How It Works</span>
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
