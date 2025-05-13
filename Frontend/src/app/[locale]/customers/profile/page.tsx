import ProfilePage from "@/modules/customers/presentation/pages/profile/profile.page";
import ServerSideProtectRouter from "@/utils/protect.router";

const CustomerProfilePage = async () => {
  await ServerSideProtectRouter();
  return <ProfilePage />;
};

export default CustomerProfilePage;
