import React, { createContext, ReactNode, useState, useContext } from "react";
import { LoginUser, AuthUser } from "../interfaces/UserAuthInterfaces";
import axios from "axios";
import Cookies from "js-cookie";

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (loginData: LoginUser) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (loginData: LoginUser) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/users/login",
        loginData,
        { withCredentials: true }
      );
      const { user } = response.data;
      setUser(user);
      setIsAuthenticated(true);
      console.log("You are logged in.", response, `I am user ${user.username}`);
    } catch (error) {
      console.log(error, "Could not log you in.");
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
