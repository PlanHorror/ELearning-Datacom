"use client";
import { Layout } from "antd";
import { useAdminContext } from "@/shared/hooks/admin.context";

const AdminContent = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { Content } = Layout;
  const { collapseMenu } = useAdminContext()!;

  return (
    <Content
      style={{
        margin: "24px 16px 0",
        marginLeft: collapseMenu ? 80 : 200,
        transition: "margin-left 0.2s",
      }}
    >
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#ccc",
          borderRadius: "#ccc",
        }}
      >
        {children}
      </div>
    </Content>
  );
};
export default AdminContent;
