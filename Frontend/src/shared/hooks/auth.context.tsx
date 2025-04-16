// "use client";

// import { createContext, useState, useContext } from "react";

// interface AuthContextType {
//   isLoggedIn: boolean;
//   username: string;
//   login: (user: string) => void;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType>({
//   isLoggedIn: false,
//   username: "",
//   login: () => {},
//   logout: () => {},
// });

// export const AuthProvider = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username, setUsername] = useState("");

//   const login = (username: string) => {
//     setIsLoggedIn(true);
//     setUsername(username);
//     console.log("Check username", username);
//     console.log("Check login", isLoggedIn);
//   };

//   const logout = () => {
//     setIsLoggedIn(false);
//     setUsername("");
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
