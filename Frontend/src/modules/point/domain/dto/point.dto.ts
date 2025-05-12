export interface Point {
  totalPoints: number;
  availablePoints: number;
  usedPoints: number;
}

export interface PointHistory {
  id: string;
  type: string;
  points: number;
  description: string;
  createdAt: string;
  customerId: string;
}
