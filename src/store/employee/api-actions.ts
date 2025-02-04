import { CreateEmployeeDto } from "@/dto/employees/create-employee.dto";
import { UpdateEmployeeDto } from "@/dto/employees/update-employee.dto";
import { toast } from "@/hooks/use-toast";
import { AllDataServer, DataWithMeta } from "@/types/data-meta.interface";
import { Employee, EmployeeServer } from "@/types/employee.interface";
import { Query } from "@/types/query.type";
import { AppDispatch, AppRequestError, State } from "@/types/state.type";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { getFormattedQuery, getRaskItem } from "@/utils/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

export const fetchEmployees = createAsyncThunk<
  DataWithMeta<Employee>,
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.FetchListEmployees}`,
  async (query, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(query);
      const { items, meta } = await api
        .get<AllDataServer<Employee>>(`${ApiRoute.GetAccounts}/${queryString}`)
        .then((res) => res.data);

      return {
        data: items,
        totalPages: meta.totalPages,
        currentPage: meta.currentPage,
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить перечень сотрудников",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
export const fetchFindEmployees = createAsyncThunk<
  DataWithMeta<Employee>,
  { text: string; query: Query },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.FindListEmployees}`,
  async (dto, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(dto.query);
      const { items, meta } = await api
        .post<AllDataServer<Employee>>(
          `${ApiRoute.FindAccounts}/${queryString}`,
          dto
        )
        .then((res) => res.data);

      return {
        data: items,
        totalPages: meta.totalPages,
        currentPage: meta.currentPage,
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить перечень сотрудников",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
export const addEmployee = createAsyncThunk<
  Employee,
  CreateEmployeeDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.AddEmployee}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await Promise.resolve(
        await api
          .post<EmployeeServer>(`${ApiRoute.CreateAccount}`, dto)
          .then(async (res) => {
            return (
              res.data &&
              (await api.get<Employee>(`${ApiRoute.Account}/${res.data.id}`))
            );
          })
      );
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      // toast({
      //   variant: "destructive",
      //   title: "Не удалось создать аккаунт",
      //   description: axiosError.response?.data.message,
      // });
      return Promise.reject(axiosError);
    }
  }
);

export const updateEmployee = createAsyncThunk<
  void,
  UpdateEmployeeDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.UpdateEmployee}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const data = await api.patch<Employee>(
        `${ApiRoute.Account}/${dto.id}`,
        dto
      );
      if (data.status === 200) {
        dispatch(fetchEmployees({ page: Number(getRaskItem("page")) }));
      }
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось обновить аккаунт",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const appointCompanies = createAsyncThunk<
  void,
  {
    users: { id: number; roles_id: number[]; companies_id: number[] }[];
    companies_id: number[];
  },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.AppointCompamies}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      await Promise.all(
        dto.users.map(async ({ id, roles_id, companies_id }) => {
          const allCompanies = [...companies_id, ...dto.companies_id];
          const uniqueCompanies = Array.from(new Set(allCompanies));
          await api.patch(`${ApiRoute.Account}/${id}`, {
            id,
            roles_id: roles_id,
            companies_id: uniqueCompanies,
          });
        })
      );
      dispatch(fetchEmployees({ page: Number(getRaskItem("page")) }));
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось обновить аккаунты",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk<
  Employee,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.FetchEmployeeById}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<Employee>(`${ApiRoute.Account}/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось получить данные аккаунта",
        description: axiosError.response?.data.message ?? "Ошибка на сервере",
      });
      return Promise.reject(axiosError);
    }
  }
);

export const deleteEmployee = createAsyncThunk<
  number[],
  number[],
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Employee}/${ActionName.DeleteEmployee}`,
  async (ids, { extra: api }) => {
    try {
      ids.map(async (id) => await api.delete(`${ApiRoute.Account}/${id}`));
      return ids;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось удалить аккаунт",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
