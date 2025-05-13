"use client";

import { usePathname } from "@/i18n/navigation";
import { RouterPath } from "@/shared/constants/router.const";
import Header from "@/shared/components/header/header.component";
import Footer from "@/shared/components/footer/footer.component";

export function HeaderWrapper() {
  const pathName = usePathname();

  const hideHeader =
    pathName === RouterPath.SIGNUP || pathName === RouterPath.DASHBOARD;

  if (hideHeader) return null;

  return <Header />;
}

export function FooterWrapper() {
  const pathName = usePathname();

  const hideFooter =
    pathName === RouterPath.SIGNUP || pathName === RouterPath.DASHBOARD;

  if (hideFooter) return null;

  return <Footer />;
}
