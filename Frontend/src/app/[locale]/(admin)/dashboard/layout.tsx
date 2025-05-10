"use client";

import AdminContent from "@/shared/components/layout/admin.content";
import AdminFooter from "@/shared/components/layout/admin.footer";
import AdminHeader from "@/shared/components/layout/admin.header";
import AdminSideBar from "@/shared/components/layout/admin.sidebar";
import { AdminContextProvider } from "@/shared/hooks/admin.context";

const AdminLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <AdminContextProvider>
      <div style={{ display: "flex", maxWidth: "100vw" }}>
        <div className="left-side" style={{ minWidth: 100 }}>
          <AdminSideBar />
        </div>
        <div className="right-side" style={{ flex: 1, maxWidth: "90%" }}>
          <AdminHeader />
          <AdminContent>{children}</AdminContent>
          <AdminFooter />
        </div>
      </div>
    </AdminContextProvider>
  );
};

export default AdminLayout;
