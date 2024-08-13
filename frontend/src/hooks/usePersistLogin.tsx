import { useEffect } from "react";
import axios from "axios";
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
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
        }
      };
      verifyMe();
    }
  }, []);
}

export default usePersistLogin;
