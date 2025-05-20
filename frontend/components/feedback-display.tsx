"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Award } from "lucide-react";
import type { FeedbackType } from "@/lib/types";

interface FeedbackDisplayProps {
  feedback: FeedbackType;
}

export default function FeedbackDisplay({ feedback }: FeedbackDisplayProps) {
  const { strengths, improvements, rating } = feedback;

  // Determine rating color
  const getRatingColor = (rating: number) => {
    if (rating >= 8) return "text-green-500 dark:text-green-400";
    if (rating >= 6) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  const getRatingBg = (rating: number) => {
    if (rating >= 8) return "bg-green-50 dark:bg-green-950/30";
    if (rating >= 6) return "bg-yellow-50 dark:bg-yellow-950/30";
    return "bg-red-50 dark:bg-red-950/30";
  };

  const ratingColor = getRatingColor(rating);
  const ratingBg = getRatingBg(rating);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <Card className="border-primary/20 shadow-lg overflow-hidden">
      <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-600 to-blue-500"></div>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <Award className="h-5 w-5 text-primary mr-2" />
            Resume Feedback
          </span>
          <div
            className={`flex items-center justify-center ${ratingBg} p-2 rounded-lg`}
          >
            <span className={`text-2xl font-bold ${ratingColor}`}>
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground ml-1">/10</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          <div>
            <h3 className="text-lg font-medium flex items-center mb-3">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
              Strengths
            </h3>
            <motion.ul className="space-y-3">
              {strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  className="flex items-start bg-green-50/50 dark:bg-green-950/10 p-3 rounded-lg"
                >
                  <Badge
                    variant="outline"
                    className="mr-3 mt-0.5 bg-green-100 dark:bg-green-900 border-green-200 dark:border-green-800 text-green-700 dark:text-green-300"
                  >
                    +
                  </Badge>
                  <span>{strength}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <div>
            <h3 className="text-lg font-medium flex items-center mb-3">
              <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
              Areas for Improvement
            </h3>
            <motion.ul className="space-y-3">
              {improvements.map((improvement, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  className="flex items-start bg-yellow-50/50 dark:bg-yellow-950/10 p-3 rounded-lg"
                >
                  <Badge
                    variant="outline"
                    className="mr-3 mt-0.5 bg-yellow-100 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800 text-yellow-700 dark:text-yellow-300"
                  >
                    Δ
                  </Badge>
                  <span>{improvement}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}
