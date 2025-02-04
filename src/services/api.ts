import { TokenData } from "@/types/auth-data.type";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { dropToken, getToken, saveToken } from "./token";
import { ApiRoute } from "@/utils/constant";

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    timeout: 5000,

    withCredentials: true,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response.status === 401 &&
        error.config &&
        !error.config._retry
      ) {
        originalRequest._retry = true;
        try {
          const { data } = await axios.get<TokenData>(
            `${import.meta.env.VITE_API_URL}/${ApiRoute.Refresh}`,
            { withCredentials: true }
          );
          saveToken(data.accessToken);
          return api.request(originalRequest);
        } catch (e) {
          dropToken();
          throw error;
        }
      }
      throw error;
    }
  );

  return api;
};
