import { CreateCompaniesGroupDto } from "@/dto/companies/create-companies-group.dto";
import { UpdateCompaniesGroupDto } from "@/dto/companies/update-companies-group.dto";
import { toast } from "@/hooks/use-toast";
import { CompanyGroup } from "@/types/company.interface";
import { AllDataServer, DataWithMeta } from "@/types/data-meta.interface";
import { Query } from "@/types/query.type";
import { AppDispatch, AppRequestError, State } from "@/types/state.type";
// import {
//   // adaptGroupsToClient,
//   adaptGroupToClient,
// } from "@/utils/adapters/adaptersToClient";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { getFormattedQuery, getRaskItem } from "@/utils/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
// import { api } from "..";

export const fetchGroupCompanyById = createAsyncThunk<
  CompanyGroup,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.FetchGroupCompanyById}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<CompanyGroup>(
        `${ApiRoute.CompaniesGroup}/${id}`
      );
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить группу компаний",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const fetchGroupCompanies = createAsyncThunk<
  DataWithMeta<CompanyGroup>,
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.FetchListGroupCompanies}`,
  async (query, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(query);
      const { items, meta } = await api
        .get<AllDataServer<CompanyGroup>>(
          `${ApiRoute.GetCompaniesGroup}/${queryString}`
        )
        .then((res) => res.data);

      // const dataServer = await Promise.all(
      //   items.map(
      //     async (item: DefaultItem) =>
      //       await api
      //         .get<CompanyGroupServer>(
      //           `${ApiRoute.CompaniesGroup}/${item.group_id}`
      //         )
      //         .then((res) => res.data)
      //   )
      // );

      // const data = adaptGroupsToClient(items as CompanyGroupServer[]);
      return {
        data: items,
        totalPages: meta.totalPages,
        currentPage: meta.currentPage,
      };
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить перечень групп компаний",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const addGroupCompany = createAsyncThunk<
  CompanyGroup,
  CreateCompaniesGroupDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.AddGroupCompany}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await Promise.resolve(
        await api.post<CompanyGroup>(`${ApiRoute.CreateCompaniesGroup}`, dto)
        // .then(
        //   // async (res) =>
        //   //   res.data &&
        //   //   (await api.get<CompanyGroupServer>(
        //   //     `${ApiRoute.CompaniesGroup}/${res.data.group_id}`
        //   //   ))
        // )
      );
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось создать группу компаний",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const updateGroupCompany = createAsyncThunk<
  void,
  UpdateCompaniesGroupDto,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.UpdateGroupCompany}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const data = await api.patch(
        `${ApiRoute.CompaniesGroup}/${dto.group_id}`,
        dto
      );
      if (data.status === 200) {
        dispatch(
          fetchGroupCompanies({
            page: Number(getRaskItem("page")),
            limit: Number(localStorage.getItem("group-company-limit")),
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

export const deleteGroupCompany = createAsyncThunk<
  void,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Company}/${ActionName.DeleteGroupCompany}`,
  async (id, { dispatch, extra: api }) => {
    try {
      await api.delete(`${ApiRoute.CompaniesGroup}/${id}`);
      dispatch(fetchGroupCompanies({ page: Number(getRaskItem("page")) }));
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось удалить группу компаний",
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
