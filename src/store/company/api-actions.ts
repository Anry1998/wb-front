// @ts-nocheck
import { CreateCompanyDto } from "@/dto/companies/create-company.dto";
import { UpdateCompanyDto } from "@/dto/companies/update-company.dto";
import { toast } from "@/hooks/use-toast";
import { Company, CompanyServer } from "@/types/company.interface";
import { AllDataServer, DataWithMeta } from "@/types/data-meta.interface";
import { Query } from "@/types/query.type";
import { AppDispatch, AppRequestError, State } from "@/types/state.type";
// import // adaptCompaniesToClient,
// // adaptCompanyToClient,
// "@/utils/adapters/adaptersToClient";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { getFormattedQuery, getRaskItem } from "@/utils/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";

export const fetchCompanyById = createAsyncThunk<
  Company,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.FetchCompanyById}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<CompanyServer>(
        `${ApiRoute.Company}/${id}`
      );
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить компанию",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const fetchCompanies = createAsyncThunk<
  DataWithMeta<Company>,
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.FetchListCompanies}`,
  async (query, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(query);
      const { items, meta } = await api
        .get<AllDataServer<Company>>(`${ApiRoute.GetCompanies}/${queryString}`)
        .then((res) => res.data);
      // const dataServer = await Promise.all(
      //   items.map(
      //     async (item: Company) =>
      //       await api
      //         .get<CompanyServer>(`${ApiRoute.Company}/${item.seller_id}`)
      //         .then((res) => res.data)
      //   )
      // );
      // const data = adaptCompaniesToClient(dataServer);
      return {
        data: items,
        totalPages: meta.totalPages,
        // currentPage: meta.currentPage,
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить перечень  компаний",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const addCompany = createAsyncThunk<
  Company,
  CreateCompanyDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.AddCompany}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await Promise.resolve(
        await api
          .post<Company>(`${ApiRoute.CreateCompany}`, dto)
          .then(
            async (res) =>
              res.data &&
              (await api.get<AllDataServer<Company>>(
                `${ApiRoute.GetCompanies}/${queryString}`
              ))
          )
      );
      return adaptCompanyToClient(data);
    } catch (error) {
      const axiosError = error as AppRequestError;
      // toast({
      //   variant: "destructive",
      //   title: "Не удалось создать компанию",
      //   description: axiosError.response?.data.message,
      // });
      return Promise.reject(axiosError);
    }
  }
);

export const updateCompany = createAsyncThunk<
  void,
  UpdateCompanyDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.UpdateCompany}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const data = await api.patch(`${ApiRoute.Company}/${dto.seller_id}`, dto);
      if (data.status === 200) {
        dispatch(
          fetchCompanies({
            page: Number(getRaskItem("page")),
            limit: localStorage.getItem("company-limit"),
          })
        );
      }
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось обновить компанию",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const deleteCompany = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.DeleteCompany}`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.delete(`${ApiRoute.Company}/${id}`);
      dispatch(
        fetchCompanies({
          page: Number(getRaskItem("page")),
          limit: localStorage.getItem("company-limit"),
        })
      );
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось удалить компанию",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
