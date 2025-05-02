export interface ScoreInput {
  // email: string;
  // courseName: string;
  // score: number;
  // completionTime: number; // in minutes
  // completedAt: string;
  // notes?: string;
  userId: string;
  lessonId: string;
  completionTime: string; // in HH:mm:ss format
  completedAt: string; // in YYYY-MM-DD format
  completionStatus: string; // "true" or "false"
}

export interface ScoreResponse {
  _id: string;
  userId: string;
  lessonId: string;
  completionTime: string; // in HH:mm:ss format
  completedAt: string; // in YYYY-MM-DD format
  completionStatus: string; // "true" or "false"
  createdAt: string;
  updatedAt: string;
}
