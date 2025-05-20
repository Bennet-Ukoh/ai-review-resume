"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ResumeForm from "@/components/resume-form";
import FeedbackDisplay from "@/components/feedback-display";
import type { FeedbackType } from "@/lib/types";

interface SubmitSectionProps {
  onSubmit: (resumeText: string, jobRole: string) => Promise<FeedbackType>;
  isLoading: boolean;
}

export default function SubmitSection({
  onSubmit,
  isLoading,
}: SubmitSectionProps) {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  async function handleSubmit(resumeText: string, jobRole: string) {
    await onSubmit(resumeText, jobRole).then((data: FeedbackType) => {
      setFeedback(data);
    });
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <AnimatePresence mode="wait">
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <FeedbackDisplay feedback={feedback} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
