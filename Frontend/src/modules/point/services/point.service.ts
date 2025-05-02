import axios from "axios";
import { Point, PointHistory } from "../domain/dto/point.dto";
import { getSession } from "next-auth/react";

export class PointService {
  private static instance: PointService;
  private baseUrl = process.env.NEXT_PUBLIC_API_URL;

  private constructor() {}

  public static getInstance(): PointService {
    if (!PointService.instance) {
      PointService.instance = new PointService();
    }
    return PointService.instance;
  }

  async getPoints(): Promise<Point> {
    const session = await getSession();
    const response = await axios.get(`${this.baseUrl}/points`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    return response.data;
  }

  async getPointHistory(): Promise<PointHistory[]> {
    const session = await getSession();
    const response = await axios.get(`${this.baseUrl}/points/history`, {
      headers: {
        Authorization: `Bearer ${session?.user?.accessToken}`,
      },
    });
    return response.data;
  }
}
