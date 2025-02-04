import { toast } from "@/hooks/use-toast";
import { AllDataServer, DataWithMeta } from "@/types/data-meta.interface";
import { Query } from "@/types/query.type";
import { AppDispatch, AppRequestError, State } from "@/types/state.type";
import { UserRole, UserRoleServer } from "@/types/user.interface";
import { adaptPermissionsToClient } from "@/utils/adapters/adaptersToClient";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { getFormattedQuery, getRaskItem } from "@/utils/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosInstance } from "axios";

export const fetchRoles = createAsyncThunk<
  DataWithMeta<UserRole>,
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Role}/${ActionName.FetchListRoles}`,
  async (query, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(query);
      const { items, meta } = await api
        .get<AllDataServer<UserRoleServer>>(
          `${ApiRoute.GetRoles}/${queryString}`
        )
        .then((res) => res.data);

      const data = items.map((item) => {
        return {
          ...item,
          permissions: adaptPermissionsToClient(item.permissions),
        };
      });
      return {
        data,
        totalPages: meta.totalPages,
        currentPage: meta.currentPage,
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchUserRoles = createAsyncThunk<
  UserRole[] | null,
  { role_id: number }[] | null,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Role}/${ActionName.FetchUserRoles}`,
  async (ids, { extra: api }) => {
    try {
      if (!ids) {
        return null;
      }
      const roles = await Promise.all(
        ids.map(
          async (item) =>
            await api
              .get<UserRoleServer>(`${ApiRoute.Role}/${item}`)
              .then((res) => res.data)
        )
      );
      const data = roles.map((item) => ({
        ...item,
        permissions: adaptPermissionsToClient(item.permissions),
      }));
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      toast({
        variant: "destructive",
        title: "Не удалось получить роли пользователя",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const fetchRoleById = createAsyncThunk<
  UserRole,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Role}/${ActionName.FetchRoleById}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<UserRoleServer>(`${ApiRoute.Role}/${id}`);
      return {
        ...data,
        permissions: adaptPermissionsToClient(data.permissions),
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить роль",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const addRole = createAsyncThunk<
  UserRole,
  { name: string; permissions: number[]; vailableEveryone: boolean },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.AddRole}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await api.post<UserRoleServer>(
        `${ApiRoute.CreateRole}`,
        dto
      );
      return {
        ...data,
        permissions: adaptPermissionsToClient(data.permissions),
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось создать роль",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const updateRole = createAsyncThunk<
  void,
  {
    id: number;
    name: string;
    permissions: number[];
    vailableEveryone: boolean;
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.UpdateRole}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const data = await api.patch(`${ApiRoute.Role}/${dto.id}`, dto);
      if (data.status === 200) {
        dispatch(fetchRoles({ page: Number(getRaskItem("page")) }));
      }
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось обновить роль",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const deleteRole = createAsyncThunk<
  number,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Role}/${ActionName.DeleteRole}`,
  async (id, { extra: api }) => {
    try {
      await api.delete(`${ApiRoute.Role}/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось удалить роль",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
