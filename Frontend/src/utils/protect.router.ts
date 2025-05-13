import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";

const ServerSideProtectRouter = async () => {
  const session = await auth();
  if (!session) {
    redirect({ href: "/auth/login", locale: "en" });
  }
};

export default ServerSideProtectRouter;
