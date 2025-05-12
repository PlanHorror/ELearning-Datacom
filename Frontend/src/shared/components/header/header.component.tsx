"use client";

import styles from "./header.component.module.scss";
import Image from "next/image";
import logo from "@/public/logo-bgwhite.svg";
import { Col, Dropdown, Input, Row, Select, Space, Tooltip } from "antd";
import { RouterPath } from "@/shared/constants/router.const";
import {
  HeartOutlined,
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import UserIconComponent from "@/shared/icons/user-icon/user.icon.component";
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { signOut, useSession } from "next-auth/react";
import AlertIcon from "@/shared/icons/alert-icon/alert.icon";
import { Medal, Tickets, Trophy } from "lucide-react";
import type { MenuProps } from "antd";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { LoadingComponent } from "../loading/loading.component";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { toast } from "sonner";

const Header = () => {
  const t = useTranslations();
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathName = usePathname();
  const locale = useLocale();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<GetCustomerByIdResponse | null>(null);

  const profileFetchedRef = useRef(false);
  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (session?.user?.role === "Company") {
      return;
    }
    if (status !== "authenticated" || !session?.user) {
      return;
    }

    const currentUserId = session?.user?.id || session?.user?.email;

    if (!currentUserId) {
      return;
    }

    if (profileFetchedRef.current && currentUserId === userIdRef.current) {
      return;
    }

    userIdRef.current = currentUserId;

    const fetchProfile = async () => {
      if (isLoading) return;

      let isMounted = true;
      try {
        setIsLoading(true);
        const customerUseCase = new CustomerUseCase();
        const res = await customerUseCase.getCustomerById();

        if (!isMounted) return;

        if (res.status === 200) {
          setProfile(res.data);
          profileFetchedRef.current = true;
        } else {
          toast.error("Get customer profile failed!");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        if (isMounted) {
          toast.error("Get customer profile failed!");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }

      return () => {
        isMounted = false;
      };
    };

    fetchProfile();
  }, [status]);

  useEffect(() => {
    if (status === "unauthenticated" || !session) {
      profileFetchedRef.current = false;
      userIdRef.current = null;
      setProfile(null);
    }
  }, [status, session]);

  const goProfilePage = useCallback(() => {
    try {
      setIsLoading(true);
      if (session?.user?.role === "Customer") {
        router.push(RouterPath.CUSTOMER_PROFILE);
      } else if (session?.user?.role === "Company") {
        router.push(RouterPath.COMPANY_PROFILE);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [session?.user?.role, router]);

  const handleChangeLanguage = useCallback(
    (value: string) => {
      startTransition(() => {
        const newPathname = pathName.replace(`/${locale}`, "");
        router.replace(`/${value}${newPathname}`);
      });
    },
    [pathName, locale, router]
  );

  const goSignIn = useCallback(() => {
    try {
      setIsLoading(true);
      router.push(RouterPath.SIGNIN);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const goSignUp = useCallback(() => {
    try {
      setIsLoading(true);
      router.push(RouterPath.SIGNUP);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Memoize menu items
  const items: MenuProps["items"] = React.useMemo(
    () => [
      {
        label: (
          <div className={styles.item_wrapper} onClick={goProfilePage}>
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
    ],
    [goProfilePage, t]
  );

  if (isLoading) {
    return <LoadingComponent />;
  }

  console.log("Check profile", profile);
  return (
    <>
      {isPending && <LoadingComponent />}
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
                  <Link href="/coupons" className={styles.nav_link}>
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
                  <HeartOutlined size={25} />
                  <Link href={RouterPath.COUPONS} className={styles.points_container}>
                    <Tooltip
                      title={
                        t("profile.points") + ": " + (profile?.points ?? 0)
                      }
                      placement="bottom"
                    >
                      <div className={styles.points_badge_wrapper}>
                        <span className={styles.points_badge}>
                          {profile?.points ?? 0}
                        </span>
                        <Trophy className={styles.trophy_icon} />
                      </div>
                    </Tooltip>
                  </Link>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <Space className={styles.user_icon_wrapper}>
                      {session?.user?.role === "Customer" ? (
                        <UserIconComponent
                          username={`${session.user?.username}`}
                          role={`@${session.user?.role}`}
                        />
                      ) : (
                        <UserIconComponent
                          username={`${session.user?.company_name}`}
                          role={`@${session.user?.role}`}
                        />
                      )}
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

export default React.memo(Header);
