import axios from "axios";
import { ScoreInput, ScoreResponse } from "../domain/dto/score.dto";
import { getSession } from "next-auth/react";

export class ScoreService {
  private static instance: ScoreService;
  private baseUrl: string;

  private constructor() {
    this.baseUrl =
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
  }

  public static getInstance(): ScoreService {
    if (!ScoreService.instance) {
      ScoreService.instance = new ScoreService();
    }
    return ScoreService.instance;
  }

  public async createScore(data: ScoreInput): Promise<ScoreResponse> {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("No access token found");
      }

      const response = await axios.post(`${this.baseUrl}/admin/scores`, data, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error creating score:", error);
      throw error;
    }
  }

  public async getScores(): Promise<ScoreResponse[]> {
    try {
      const session = await getSession();
      if (!session?.user?.accessToken) {
        throw new Error("No access token found");
      }

      const response = await axios.get(`${this.baseUrl}/admin/scores`, {
        headers: {
          Authorization: `Bearer ${session.user.accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching scores:", error);
      throw error;
    }
  }
}
