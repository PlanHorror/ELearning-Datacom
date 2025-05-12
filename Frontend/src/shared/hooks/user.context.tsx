"use client";

import { GetCompanyByIdResponse } from "@/modules/companies/domain/dto/company.dto";
import { CompanyUseCase } from "@/modules/companies/domain/usecases/company.usecase";
import { GetCustomerByIdResponse } from "@/modules/customers/domain/dto/getCustomer.dto";
import { CustomerUseCase } from "@/modules/customers/domain/usecases/customer.usecase";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";

interface IUserContext {
  user: GetCustomerByIdResponse | GetCompanyByIdResponse | null;
  setUser: (
    user: GetCustomerByIdResponse | GetCompanyByIdResponse | null
  ) => void;
}

export const UserContext = createContext<IUserContext | null>(null);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<
    GetCustomerByIdResponse | GetCompanyByIdResponse | null
  >(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      setUser(null);
      return;
    }
    const fetchProfile = async () => {
      if (!session?.user) {
        setUser(null);
        return;
      }
      if (session.user.role === "Customer") {
        const customerUseCase = new CustomerUseCase();
        const res = await customerUseCase.getCustomerById();
        if (res.status === 200) setUser(res.data);
        else setUser(null);
      } else if (session.user.role === "Company") {
        const companyUseCase = new CompanyUseCase();
        const res = await companyUseCase.getCompanyById();
        if (res.status === 200) setUser(res.data);
        else setUser(null);
      } else {
        setUser(null);
      }
    };
    fetchProfile();
  }, [status, session?.user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
};
