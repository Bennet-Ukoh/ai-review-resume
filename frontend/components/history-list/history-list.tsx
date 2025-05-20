// frontend/components/history-list/HistoryList.tsx
"use client";

import { useHistoryData } from "@/hooks/useHistoryData";
import HistorySkeleton from "./history-skeleton";
import HistoryEmpty from "./history-empty";
import HistoryError from "./history-error";
import HistoryCard from "./history-card";
import type { HistoryItemType } from "@/lib/types";

export default function HistoryList() {
  const { data: history, isLoading, error } = useHistoryData();

  if (isLoading) {
    return <HistorySkeleton />;
  }

  if (error) {
    return <HistoryError message={error} />;
  }

  if (history.length === 0) {
    return <HistoryEmpty />;
  }

  return (
    <div className="space-y-4">
      {history.map((item: HistoryItemType, index: number) => (
        <HistoryCard key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
