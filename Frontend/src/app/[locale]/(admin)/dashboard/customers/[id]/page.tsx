"use client";
import CustomerPage from "@/modules/admin/presentation/pages/dashboard/customer/customer.page";
import { useParams } from "next/navigation";

const CustomerMainPage = () => {
  const params = useParams<{ id: string }>();
  return <CustomerPage id={params.id} />;
};
export default CustomerMainPage;
