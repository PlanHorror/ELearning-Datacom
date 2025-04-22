import PointPage from "@/modules/point/presentation/pages/points/point.page";
import ServerSideProtectRouter from "@/utils/protect.router";

const PointMainPage = async () => {
  await ServerSideProtectRouter();
  return <PointPage />;
};

export default PointMainPage;
