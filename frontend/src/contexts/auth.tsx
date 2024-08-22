import React, { createContext, ReactNode, useState, useContext } from "react";
import { LoginUser, AuthUser } from "../interfaces/UserAuthInterfaces";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: AuthUser | null;
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  login: (loginData: LoginUser) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  accessToken: null,
  setAccessToken: () => {},
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const login = async (loginData: LoginUser) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/users/login",
        loginData,
        { withCredentials: true }
      );
      const { user, accessToken } = response.data;
      // cookie expires in 10 mins
      Cookies.set("accessToken", accessToken, { expires: 15 / (24 * 60) });
      setAccessToken(accessToken);
      setUser(user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error, "Could not log you in.");
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        accessToken,
        setAccessToken,
        setIsAuthenticated,
        setUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
