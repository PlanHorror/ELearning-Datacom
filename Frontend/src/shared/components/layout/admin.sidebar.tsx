"use client";

import { Layout, Menu } from "antd";
import {
  FileOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Building2 } from "lucide-react";
import { RouterPath } from "@/shared/constants/router.const";
import { Link } from "@/i18n/navigation";
import { useAdminContext } from "@/shared/hooks/admin.context";

const { Sider } = Layout;

const AdminSideBar = () => {
  const { collapseMenu, setCollapseMenu } = useAdminContext()!;
  const routerPath = RouterPath;
  return (
    <Sider
      collapsible
      collapsed={collapseMenu}
      onCollapse={(collapsed) => setCollapseMenu(collapsed)}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        items={[
          {
            key: "1",
            icon: <PieChartOutlined />,
            label: (
              <Link href={routerPath.DASHBOARD}>Home</Link>
            ),
          },
          {
            key: "2",
            icon: <UserOutlined />,
            label: "Customers",
          },
          {
            key: "3",
            icon: <Building2 size={14} />,
            label: "Companies",
          },
          {
            key: "4",
            icon: <FileOutlined />,
            label: (
              <Link href={routerPath.DASHBOARD_INPUT_SCORE}>Input Score</Link>
            ),
          },
          {
            key: "5",
            icon: <SettingOutlined />,
            label: "Setting",
          },
        ]}
      />
    </Sider>
  );
};

export default AdminSideBar;
