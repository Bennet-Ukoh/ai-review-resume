// frontend/hooks/useHistoryData.ts
import { useState, useEffect } from "react";
import type { HistoryItemType } from "@/lib/types";

/**
 * Custom hook to fetch review history from the backend.
 * Returns { data, isLoading, error }.
 */
export function useHistoryData() {
  const [data, setData] = useState<HistoryItemType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchHistory() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:3001/api/history");
        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }
        const json: HistoryItemType[] = await response.json();
        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        console.error("Error fetching history:", err);
        if (!cancelled) {
          setError((err as Error).message);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    fetchHistory();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, isLoading, error };
}
