import CompanyProfilePage from "@/modules/companies/presentation/pages/profile/company.profile.page";
import ServerSideProtectRouter from "@/utils/protect.router";

const CompanyProfileMainPage = async() => {
  await ServerSideProtectRouter();
  return <CompanyProfilePage />;
};

export default CompanyProfileMainPage;
