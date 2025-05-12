import axios from "axios";
import { PointHistory } from "../domain/dto/point.dto";
import { getSession } from "next-auth/react";

export class PointService {

  async getPointHistory(): Promise<PointHistory[]> {
    const session = await getSession();
    const accessToken = session?.accessToken;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    return await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/points-history`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  }
}
