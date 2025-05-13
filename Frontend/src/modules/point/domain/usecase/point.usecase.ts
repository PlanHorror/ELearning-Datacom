import { PointService } from "../../services/point.service";

export class PointUseCase {
  private pointService: PointService;

  constructor() {
    this.pointService = new PointService();
  }

  async getPointHistory() {
    try {
      const res = await this.pointService.getPointHistory();
      return res;
    } catch (error) {
      throw error;
    }
  }
}
