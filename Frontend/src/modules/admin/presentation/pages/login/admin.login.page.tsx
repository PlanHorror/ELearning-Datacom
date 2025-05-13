"use client";

import { useState, useEffect } from "react";
import { Form, Input, Button, Card } from "antd";
import styles from "./admin.login.page.module.scss";
import { toast } from "sonner";
import { useLocale, useTranslations } from "next-intl";
import { Select } from "antd";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { adminAuthService } from "@/modules/admin/services/admin.auth.service";

const AdminLoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations();
  const pathName = usePathname();
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();

  useEffect(() => {
    if (adminAuthService.isAuthenticated()) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleChangeLanguage = (value: string) => {
    startTransition(() => {
      router.replace(pathName, { locale: value });
    });
  };

  const onFinish = async (values: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await adminAuthService.login(values);
      adminAuthService.setSession(response);

      if (adminAuthService.isAuthenticated()) {
        toast.success(t("admin.loginSuccess"));
        router.replace("/dashboard");
      } else {
        throw new Error("Failed to set session");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(t("admin.loginFailed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.admin_login_container}>
      <Card title={t("admin.title")} className={styles.admin_login_card}>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 24,
          }}
        >
          <Select
            defaultValue={locale}
            style={{ width: 120 }}
            onChange={handleChangeLanguage}
            options={[
              { value: "en", label: "English" },
              { value: "jp", label: "日本語" },
            ]}
            loading={isPending}
          />
        </div>
        <Form name="admin_login" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={t("admin.username")}
            name="username"
            rules={[{ required: true, message: t("admin.usernameRequired") }]}
          >
            <Input placeholder={t("admin.usernamePlaceholder")} />
          </Form.Item>
          <Form.Item
            label={t("admin.password")}
            name="password"
            rules={[{ required: true, message: t("admin.passwordRequired") }]}
          >
            <Input.Password placeholder={t("admin.passwordPlaceholder")} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {t("admin.login")}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AdminLoginPage;
