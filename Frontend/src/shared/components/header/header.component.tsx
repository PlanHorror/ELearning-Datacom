"use client";

import styles from "./header.component.module.scss";
import Image from "next/image";
import logo from "@/public/logo-bgwhite.svg";
import { Col, Dropdown, Input, Row, Select, Space } from "antd";
import { RouterPath } from "@/shared/constants/router.const";
import {
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserIconComponent from "@/shared/icons/user-icon/user.icon.component";
import React, { ChangeEvent, useState, useTransition } from "react";
import { signOut, useSession } from "next-auth/react";
import AlertIcon from "@/shared/icons/alert-icon/alert.icon";
import { Medal, Tickets, Trophy } from "lucide-react";
import type { MenuProps } from "antd";
import { Link } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LoadingComponent } from "../loading/loading.component";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: session } = useSession();
  const pathName = usePathname();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

  const goProfilePage = () => {
    setIsLoading(true);
    if (session?.user?.role === "Customer") {
      router.push(RouterPath.CUSTOMER_PROFILE);
    }
    if (session?.user?.role === "Company") {
      router.push(RouterPath.COMPANY_PROFILE);
    }
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className={styles.item_wrapper} onClick={() => goProfilePage()}>
          <UserOutlined /> {t("profile.profile")}
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className={styles.item_wrapper}>
          <RiseOutlined /> {t("profile.progress")}
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className={styles.item_wrapper}>
          <Medal size={15} /> {t("profile.points")}
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div className={styles.item_wrapper}>
          <Tickets size={15} /> {t("profile.coupons")}
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div className={styles.item_wrapper}>
          <SettingOutlined /> {t("profile.setting")}
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div className={styles.item_wrapper} onClick={() => signOut()}>
          <LogoutOutlined /> {t("profile.logout")}
        </div>
      ),
      key: "6",
    },
  ];

  if (
    pathName === RouterPath.OPTIONAL_SIGNIN ||
    pathName === RouterPath.CUSTOMER_SIGNIN ||
    pathName === RouterPath.COMPANY_SIGNIN ||
    pathName === RouterPath.SIGNUP ||
    pathName === RouterPath.DASHBOARD ||
    pathName === RouterPath.DASHBOARD_INPUT_SCORE
  )
    return null;

  const handleChangeLanguage = (value: string) => {
    console.log("Check value", value);
    startTransition(() => {
      console.log("Check pathname:", pathName);
      const newPathname = pathName.replace(`/${locale}`, "");
      console.log("Check newPathname", newPathname);
      router.replace(`/${value}${newPathname}`);
    });
  };

  const goSignIn = () => {
    setIsLoading(true);
    router.push(RouterPath.OPTIONAL_SIGNIN);
  };

  const goSignUp = () => {
    setIsLoading(true);
    router.push(RouterPath.SIGNUP);
  };

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className={styles.header_container}>
        <Row className={styles.header_wrapper}>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className={styles.left}
          >
            <Link href="/" className={styles.header_main_logo}>
              <Image alt="" src={logo} width={100} height={100} />
            </Link>
            <div className={styles.categories_wrapper}>
              <ul className={styles.categories_list}>
                <li className={styles.categories_item}>
                  <Link href="/" className={styles.nav_link}>
                    {t("header.home")}
                  </Link>
                </li>
                <li className={styles.categories_item}>
                  <Link href="/lessons" className={styles.nav_link}>
                    {t("header.lessons")}
                  </Link>
                </li>
                <li className={styles.categories_item}>
                  <Link href="" className={styles.nav_link}>
                    {t("header.coupons")}
                  </Link>
                </li>
                <li className={styles.categories_item}>
                  <Link href="/points" className={styles.nav_link}>
                    {t("header.points")}
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            xxl={12}
            className={styles.right}
          >
            <div className={styles.right_left}>
              <Input
                addonBefore={<SearchOutlined />}
                placeholder={`${t("header.search")}`}
              />
              <div className={styles.change_language}>
                <Select
                  defaultValue="US"
                  value={locale}
                  style={{ width: 60 }}
                  onChange={handleChangeLanguage}
                  options={[
                    {
                      value: "en",
                      label: `${t("header.english")}`,
                    },
                    {
                      value: "jp",
                      label: `${t("header.japanese")}`,
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.right_right}>
              {session?.user ? (
                <div className={styles.auth_wrapper}>
                  <AlertIcon />
                  <Trophy className={styles.trophy_icon} />
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Space className={styles.user_icon_wrapper}>
                      <UserIconComponent
                        username={`${session.user?.username}`}
                        role={`@${session.user?.role}`}
                      />
                    </Space>
                  </Dropdown>
                </div>
              ) : (
                <div>
                  <button>
                    <span className="circle1"></span>
                    <span className="circle2"></span>
                    <span className="circle3"></span>
                    <span className="circle4"></span>
                    <span className="circle5"></span>
                    <span className="text" onClick={goSignIn}>
                      {t("header.signin")}
                    </span>
                  </button>
                  <button>
                    <span className="circle1"></span>
                    <span className="circle2"></span>
                    <span className="circle3"></span>
                    <span className="circle4"></span>
                    <span className="circle5"></span>
                    <span className="text" onClick={goSignUp}>
                      {t("header.signup")}
                    </span>
                  </button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Header;
