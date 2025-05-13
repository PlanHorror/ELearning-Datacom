"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardComponent from "@/modules/admin/presentation/components/dashboard/dashboard.component";
import { adminAuthService } from "@/modules/admin/services/admin.auth.service";

const DashboardPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const session = adminAuthService.getSession();
      if (!session) {
        router.replace("/login");
      } else {
        setIsLoading(false);
      }
    };

    // Initial check
    checkAuth();

    // Set up interval to periodically check auth
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, [router]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return <DashboardComponent />;
};

export default DashboardPage;
