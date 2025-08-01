import { useAuthStore } from "../store/AuthStore";
import authService from "../services/authService";
import { useState } from "react";
import { LogInRequest } from "../types/apiRequests";
import { useUserStore } from "../store/UserStore";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { getToken } from "../utils/tokenHelper";
import { IUser } from "../types/user";

export const useAuth = () => {
  const { login, isAuthenticated, logout } = useAuthStore();
  const { setUser, user } = useUserStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [toastMsg, setToastMsg] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(
    "success"
  );
  const [activeToast, setActiveToast] = useState<boolean>(false);

  const setError = (error: unknown) => {
    if (isAxiosError(error) && error.response?.data) {
      const {
        response: { data },
      } = error;
      if (data.message) setToastMsg(data.message);
      else setToastMsg("Error desconocido");
    } else if (error instanceof Error) {
      setToastMsg(error.message);
    }
    setToastType("error");
    setActiveToast(true);
  };
  const navigate = useNavigate();

  const handleLogin = async (data: Partial<LogInRequest>) => {
    setLoading(true);
    try {
      const { access_token, user } = await authService.logIn(data);
      setUser(user);
      login(access_token);
      navigate("/publisher");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const closeToast = async () => {
    setActiveToast(false);
    setToastMsg("");
    setToastType(null);
  };

  const handleLogout = () => {
    try {
      logout();
      navigate("/login");
    } catch (error) {}
  };

  const checkToken = async () => {
    setLoading(true);
    try {
      const token = getToken();
      if (token) {
        const response = await authService.getProfile();
        setUser(response.profile);
        login(token);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const registerUser = async (user: Partial<IUser>) => {
    try {
      const userId = await authService.registerUser(user);
      return { userId };
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.data) {
          return { error: error.response?.data };
        } else {
          return {
            error:
              "Hubo un problema registrando el usuario, intentelo nuevamente.",
          };
        }
      } else if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const getUsers = async () => {
    try {
      const response = await authService.getUsers();
      const users = response.map((user) => {
        const storeCount = user.stores?.length;
        return {
          ...user,
          storeCount,
        };
      });
      return users;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return {
    registerUser,
    handleLogout,
    handleLogin,
    checkToken,
    closeToast,
    getUsers,
    user,
    loading,
    toastMsg,
    toastType,
    activeToast,
    isAuthenticated,
  };
};
