export interface Point {
  totalPoints: number;
  availablePoints: number;
  usedPoints: number;
}

export interface PointHistory {
  id: string;
  points: number;
  type: "EARN" | "SPEND";
  description: string;
  createdAt: string;
  status: "PENDING" | "COMPLETED" | "FAILED";
}
