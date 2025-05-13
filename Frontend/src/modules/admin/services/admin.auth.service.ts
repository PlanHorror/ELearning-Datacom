import axios from "axios";

const API_URL = "http://localhost:3001/admin";

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  accessToken: string;
  admin: {
    id: string;
    username: string;
    email: string;
  };
}

export const adminAuthService = {
  login: async (data: AdminLoginRequest): Promise<AdminLoginResponse> => {
    const response = await axios.post(`${API_URL}/auth/signin`, data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
  },

  setSession: (data: AdminLoginResponse) => {
    localStorage.setItem("adminToken", data.accessToken);
    localStorage.setItem("adminData", JSON.stringify(data.admin));
  },

  getSession: () => {
    try {
      const token = localStorage.getItem("adminToken");
      const adminData = localStorage.getItem("adminData");

      if (!token || !adminData) return null;

      const parsedAdminData = JSON.parse(adminData);
      return {
        token,
        admin: parsedAdminData,
      };
    } catch (error) {
      console.error("Error parsing admin session:", error);
      // Clear invalid session data
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminData");
      return null;
    }
  },

  isAuthenticated: (): boolean => {
    try {
      return (
        !!localStorage.getItem("adminToken") &&
        !!localStorage.getItem("adminData")
      );
    } catch (error) {
      return false;
    }
  },
};
