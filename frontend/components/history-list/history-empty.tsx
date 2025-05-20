// frontend/components/history-list/HistoryEmpty.tsx
"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

export default function HistoryEmpty() {
  return (
    <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="bg-primary/10 h-20 w-20 rounded-full flex items-center justify-center mx-auto">
          <Calendar className="h-10 w-10 text-primary" />
        </div>
        <h3 className="text-xl font-medium mb-2">No review history yet</h3>
        <p className="text-muted-foreground max-w-md mx-auto">
          Submit your resume to see your review history here. Your past reviews
          will be saved for easy reference.
        </p>
      </motion.div>
    </div>
  );
}
