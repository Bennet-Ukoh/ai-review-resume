export interface FeedbackType {
  strengths: string[];
  improvements: string[];
  rating: number;
}

export interface HistoryItemType {
  id: string;
  job_role: string;
  strengths: string[];
  improvements: string[];
  rating: number;
  timestamp: string;
  created_at: string;
}
