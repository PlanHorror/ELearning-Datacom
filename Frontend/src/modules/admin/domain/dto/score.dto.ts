export interface ScoreInput {
  email: string;
  courseName: string;
  score: number;
  completionTime: number; // in minutes
  completedAt: string;
  notes?: string;
}

export interface ScoreResponse {
  _id: string;
  userId: string;
  email: string;
  courseName: string;
  score: number;
  completionTime: number;
  completedAt: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
