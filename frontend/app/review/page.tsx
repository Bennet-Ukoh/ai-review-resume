"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReviewHeader from "@/components/review/review-header";
import SubmitSection from "@/components/review/submit-section";
import HistorySection from "@/components/review/history-section";
import type { FeedbackType } from "@/lib/types";
import { FileText, History as HistoryIcon } from "lucide-react";

export default function ReviewPage() {
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (resumeText: string, jobRole: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, jobRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to get feedback");
      }

      const data = await response.json();
      setFeedback(data);
      return data;
    } catch (error) {
      console.error("Error submitting resume:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <ReviewHeader />

      {/* Tabs */}
      <Tabs defaultValue="submit" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8 p-1 rounded-xl bg-muted/50">
          <TabsTrigger
            value="submit"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <FileText className="mr-2 h-4 w-4" />
            Submit Resume
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <HistoryIcon className="mr-2 h-4 w-4" />
            Review History
          </TabsTrigger>
        </TabsList>

        {/* Submit Tab Content */}
        <TabsContent value="submit" className="animate-fade-in">
          <SubmitSection onSubmit={handleSubmit} isLoading={isLoading} />
        </TabsContent>

        {/* History Tab Content */}
        <TabsContent value="history">
          <HistorySection />
        </TabsContent>
      </Tabs>
    </div>
  );
}
