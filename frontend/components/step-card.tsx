"use client";

import { motion } from "framer-motion";

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function StepCard({
  icon,
  title,
  description,
  delay = 0,
}: StepCardProps) {
  return (
    <motion.div
      className="bg-background rounded-xl p-6 border shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </motion.div>
  );
}
