"use client";

import { Col, Row } from "antd";
import styles from "./footer.component.module.scss";
import logo from "@/public/logo-bggrey.svg";
import Image from "next/image";
import FacebookIcon from "@/shared/icons/facebook-icon/facebook.icon";
import InstagramIcon from "@/shared/icons/instagram-icon/instagram.icon";
import LinkedInIcon from "@/shared/icons/linkedin-icon/linkedin.icon";
import { RouterPath } from "@/shared/constants/router.const";
import { usePathname } from "@/i18n/navigation";

const Footer = () => {
  const pathName = usePathname();

  if (
    pathName === RouterPath.OPTIONAL_SIGNIN ||
    pathName === RouterPath.CUSTOMER_SIGNIN ||
    pathName === RouterPath.COMPANY_SIGNIN ||
    pathName === RouterPath.SIGNUP ||
    pathName === RouterPath.DASHBOARD ||
    pathName === RouterPath.DASHBOARD_INPUT_SCORE
  )
    return null;

  return (
    <div className={styles.footer_container}>
      <Row className={styles.footer_wrapper}>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={6}
          xxl={6}
          className={styles.footer_information_wrapper}>
          <Image alt="" src={logo} width={100} height={100} />
          <h4 className={styles.title}>Information</h4>
          <div className={styles.contact_infor}>
            <div className={styles.item}>
              <strong>Address</strong>
              Tokyo
            </div>
            <div className={styles.item}>
              <strong>Email</strong>
              datacom@gmail.com
            </div>
            <div className={styles.item}>
              <strong>Hotline</strong>
              +84961436448
            </div>
            <div className={styles.item}>
              <strong>Support Time</strong>
              8:00 AM - 6:00 PM
            </div>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={6}
          xxl={6}
          className={styles.footer_instruction_wrapper}>
          <h4 className={styles.title}>Instruction</h4>
          <div className={styles.item_wrapper}>
            <a href="" className={styles.item}>
              Learning
            </a>
            <a href="" className={styles.item}>
              Lessons
            </a>
            <a href="" className={styles.item}>
              Coupons
            </a>
            <a href="" className={styles.item}>
              Points
            </a>
            <a href="" className={styles.item}>
              Counterparty
            </a>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={6}
          xxl={6}
          className={styles.footer_policy_wrapper}>
          <h4 className={styles.title}>Policy</h4>
          <div className={styles.item_wrapper}>
            <a href="" className={styles.item}>
              About us
            </a>
            <a href="" className={styles.item}>
              Privacy Policy
            </a>
            <a href="" className={styles.item}>
              Terms of service
            </a>
          </div>
        </Col>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={6}
          xxl={6}
          className={styles.footer_connection_wrapper}>
          <div className={styles.social_media}>
            <h4 className={styles.title}>Connection</h4>
            <div className={styles.item_container}>
              <div className={styles.item_wrapper}>
                <FacebookIcon />
                <InstagramIcon />
                <LinkedInIcon />
              </div>
            </div>
          </div>
          <div className={styles.tooltip_wrapper}>
            <ul className={styles.tooltip_container}>
              <li className={styles.nav_link}>
                <div className={styles.tooltip_tab}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: "none" }}
                    fill="none"
                    viewBox="0 0 16 16"
                    height="16"
                    width="16">
                    <path
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      stroke="#ffffff"
                      d="M1 10V8C1 2.5 6 1 8 1C10 1 15 2.5 15 8V10M1 10C1 10.5552 1 11.1543 1.0984 11.6204C1.24447 12.3122 2 13 3 13C4 13 4.75553 12.3122 4.9016 11.6204C5 11.1543 5 10.5552 5 10C5 9.44485 5 8.84565 4.9016 8.37961C4.75553 7.68776 4 7 3 7C2 7 1.24447 7.68776 1.0984 8.37961C1 8.84565 1 9.44485 1 10ZM15 10C15 10.5552 15 11.1543 14.9016 11.6204C14.7555 12.3122 14 13 13 13C12 13 11.2445 12.3122 11.0984 11.6204C11 11.1543 11 10.5552 11 10C11 9.44485 11 8.84565 11.0984 8.37961C11.2445 7.68776 12 7 13 7C14 7 14.7555 7.68776 14.9016 8.37961C15 8.84565 15 9.44485 15 10ZM15 10C15 15.5 12.5 15 8 15"></path>
                  </svg>
                  Support
                </div>
                <div className={styles.tooltip}>
                  <ul className={styles.tooltip_menu_with_icon}>
                    <li className={styles.tooltip_link}>
                      <a className={styles.tooltip_links} href="#">
                        <svg
                          aria-hidden="true"
                          role="img"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="m4.6.7 1.6 1.7c.6.6.7 1.6 0 2.2C5 6.1 5 6.4 7.2 8.7c2.4 2.4 2.7 2.4 4.2 1 .6-.5 1.6-.5 2.2 0l1.7 1.7v.1c.6.5.6 1.5 0 2.1v.1c-1.4 1.4-2.5 2-3.8 2h-.7c-1.6-.3-3.4-1.6-6.1-4.4C-.5 6.1-1 4 2.3.7 2.9.1 3.9.1 4.6.7m-1.2.4c-.2 0-.4.1-.5.3C.1 4 .5 5.9 5.3 10.7s6.6 5.2 9.3 2.4l.2.1-.2-.1c.3-.3.3-.7.1-1L13 10.4a.7.7 0 0 0-1 0c-1.9 1.8-2.7 1.6-5.3-1C4 6.6 3.8 5.8 5.6 4c.3-.3.3-.7 0-1L3.9 1.3a.7.7 0 0 0-.5-.2"
                            fillRule="evenodd"
                            fill="#FFF"></path>
                        </svg>
                        +84961436448
                      </a>
                    </li>
                    <li className={styles.tooltip_link}>
                      <a className={styles.tooltip_links} href="#">
                        <svg
                          aria-hidden="true"
                          role="img"
                          viewBox="0 0 13.971 13.971"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg">
                          <defs></defs>
                          <g id="support-clock_svg__clock">
                            <path
                              className="support-clock_svg__support-clock-cls-1"
                              d="M6.985 13.97a6.985 6.985 0 1 1 6.986-6.985 6.993 6.993 0 0 1-6.986 6.986zm0-13.47a6.485 6.485 0 1 0 6.486 6.485A6.493 6.493 0 0 0 6.985.5"></path>
                            <path
                              className="support-clock_svg__support-clock-cls-1"
                              d="M11.1 7.235H6.986a.25.25 0 0 1-.25-.25V1.972a.25.25 0 1 1 .5 0v4.763h3.866a.25.25 0 0 1 0 .5z"></path>
                          </g>
                        </svg>
                        8:30AM - 5PM JPT
                      </a>
                    </li>
                    <li className={styles.tooltip_link}>
                      <a className={styles.tooltip_links} href="#">
                        <svg
                          aria-hidden="true"
                          role="img"
                          viewBox="0 0 18.2 13.342"
                          height="16"
                          width="16"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            style={{ fill: "#fff" }}
                            d="M17.9 0H.3a.3.3 0 0 0-.3.3v12.742a.3.3 0 0 0 .3.3h17.6a.3.3 0 0 0 .3-.3V.3a.3.3 0 0 0-.3-.3M.85.5h16.554L9.101 6.364Zm6.983 5.576 1.124.799a.25.25 0 0 0 .29 0l1.527-1.08-.133.13 6.719 6.917H.956ZM.5 12.59V.867l6.918 4.915Zm10.533-6.978L17.7.902v11.574ZM.539.5.5.554V.5Z"></path>
                        </svg>
                        datacom@gmail.com
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
