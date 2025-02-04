import { toast } from "@/hooks/use-toast";
import { dropToken, getToken, saveToken } from "@/services/token";
import { LoginData, TokenData } from "@/types/auth-data.type";
import { AppDispatch, State } from "@/types/state.type";
import { User } from "@/types/user.interface";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";
import { jwtDecode } from "jwt-decode";
import { fetchUserRoles } from "../role/api-actions";

export const login = createAsyncThunk<
  void,
  LoginData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.Login}`,
  async (authData, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TokenData & User>(
        ApiRoute.Login,
        authData
      );
      saveToken(data.accessToken);
      dispatch(fetchUser(data.id));
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        variant: "destructive",
        title: "Не удалось войти",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const checkUserLogin = createAsyncThunk<
  boolean | null,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.CheckUserLogin}`,
  async (_arg, { dispatch, extra: api }) => {
    try {
      const token = getToken();
      if (!token) {
        return null;
      }
      const {
        exp,
        payload: { id },
      }: { payload: { id: number }; exp: number } = jwtDecode(token);
      let currentDate = new Date();

      if (exp * 1000 < currentDate.getTime()) {
        const { data } = await api.get<TokenData>(
          `${import.meta.env.VITE_API_URL}/${ApiRoute.Refresh}`
        );
        saveToken(data.accessToken);
      }
      dispatch(fetchUser(id));
      return true;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const errorType = axiosError.message.split(":")[0];
      if (errorType === "Invalid token specified") {
        return Promise.reject(axiosError);
      }
      toast({
        variant: "destructive",
        title: "Не удалось получить данные пользователя",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const fetchUser = createAsyncThunk<
  User | null,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.User}/${ActionName.FetchUser}`,
  async (id, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<User>(`${ApiRoute.Account}/${id}`);
      dispatch(fetchUserRoles(data.roles_id));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      toast({
        variant: "destructive",
        title: "Не удалось получить данные пользователя",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const logout = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(`${ReducerName.User}/${ActionName.Logout}`, async (_args, { extra: api }) => {
  try {
    await api.put(ApiRoute.Logout);
    dropToken();
  } catch (error) {
    return Promise.reject(error);
  }
});
