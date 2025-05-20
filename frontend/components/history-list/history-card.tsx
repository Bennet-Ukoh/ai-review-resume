// frontend/components/history-list/HistoryCard.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { Calendar, CheckCircle, AlertCircle } from "lucide-react";
import type { HistoryItemType } from "@/lib/types";

interface HistoryCardProps {
  item: HistoryItemType;
  index: number;
}

export default function HistoryCard({ item, index }: HistoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <Card className="relative overflow-hidden border-primary/20 hover:shadow-md transition-all duration-300">
        <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-purple-600/40 to-blue-500/40"></div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg flex items-center">
              <Badge className="mr-2 bg-primary/10 text-primary border-0 hover:bg-primary/20">
                {item.job_role}
              </Badge>
            </CardTitle>
            <Badge variant="outline" className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {item.created_at && !isNaN(new Date(item.created_at).getTime())
                ? formatDistanceToNow(new Date(item.created_at), {
                    addSuffix: true,
                  })
                : "Unknown date"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-2 space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  {item.strengths?.[0] ?? "No strengths available"}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                <p className="text-sm">
                  {item.improvements?.[0] ?? "No improvements available"}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {typeof item.rating === "number"
                    ? item.rating.toFixed(1)
                    : "0.0"}
                  <span className="text-sm text-muted-foreground">/10</span>
                </div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
