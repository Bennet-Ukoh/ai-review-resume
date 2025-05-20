// frontend/components/history-list/HistoryError.tsx
"use client";

import { motion } from "framer-motion";

interface HistoryErrorProps {
  message: string;
}

export default function HistoryError({ message }: HistoryErrorProps) {
  return (
    <div className="text-center py-16 bg-red-100 text-red-700 rounded-xl border border-red-200">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-xl font-medium mb-2">Error loading history</h3>
        <p className="text-muted-foreground max-w-md mx-auto">{message}</p>
      </motion.div>
    </div>
  );
}
