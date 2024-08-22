import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { useAuth } from "../contexts/auth";
import Cookies from "js-cookie";

function usePersistLogin() {
  const { setIsAuthenticated, setUser } = useAuth();

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      const verifyMe = async () => {
        try {
          const response = await axios.get(
            "http://127.0.0.1:4000/api/v1/users/me",
            {
              headers: { Authorization: `Bearer ${accessToken}` },
              withCredentials: true,
            }
          );
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user);
          } else {
            setIsAuthenticated(false);
          }
        } catch (err) {
          const error = err as AxiosError;
          if (error.response?.status === 401) {
            try {
              const refreshResponse = await axios.post(
                "http://127.0.0.1:4000/api/v1/users/refresh",
                {},
                {
                  withCredentials: true,
                }
              );
              const newAccessToken = refreshResponse.data.accessToken;
              Cookies.set("accessToken", newAccessToken, {
                expires: 15 / (24 * 60),
              });
              const retryRequest = await axios.get(
                "http://127.0.0.1:4000/api/v1/users/me",
                {
                  headers: { Authorization: `Bearer ${newAccessToken}` },
                  withCredentials: true,
                }
              );
              if (retryRequest.status === 200) {
                setIsAuthenticated(true);
                setUser(retryRequest.data.user);
              } else {
                setIsAuthenticated(false);
              }
            } catch (error) {
              setIsAuthenticated(false);
              console.log(error);
            }
          }
        }
      };
      verifyMe();
    }
  }, []);
}

export default usePersistLogin;
