"use client";

import { motion } from "framer-motion";

export default function ReviewHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h1 className="text-3xl font-bold mb-2 text-center">
        <span className="gradient-text">Resume Review</span>
      </h1>
      <p className="text-center text-muted-foreground max-w-xl mx-auto">
        Submit your resume for AI analysis or view your previous reviews
      </p>
    </motion.div>
  );
}
