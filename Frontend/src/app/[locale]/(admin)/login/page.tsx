import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import AdminLoginPage from "@/modules/admin/presentation/pages/login/admin.login.page";

const AdminLoginMainPage = async () => {
  const session = await auth();
  if (session) {
    if (session.user.role === "admin") {
      redirect({ href: "/dashboard", locale: "en" });

    } else {
      redirect({ href: "/", locale: "en" });

    }
  }
  return <AdminLoginPage />;
};
export default AdminLoginMainPage;
