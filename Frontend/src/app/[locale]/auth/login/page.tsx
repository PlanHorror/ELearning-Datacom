import LoginPage from "@/modules/auth/presentation/pages/login/login.page";
import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";

const LoginMainPage = async () => {
  const session = await auth();
  if (session) {
    redirect({ href: "/", locale: "en" });
  }
  return <LoginPage />;
};

export default LoginMainPage;
