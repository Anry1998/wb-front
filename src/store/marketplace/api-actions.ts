import { toast } from '@/hooks/use-toast';
import {
  Marketplace
} from '@/types/company.interface';
import { AllDataServer, DataWithMeta } from '@/types/data-meta.interface';
import { Query } from '@/types/query.type';
import { AppDispatch, AppRequestError, State } from '@/types/state.type';
import { ActionName, ApiRoute, ReducerName } from '@/utils/constant';
import { getFormattedQuery } from '@/utils/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';


export const fetchMarketplaces = createAsyncThunk<
DataWithMeta<Marketplace>,
  Query | undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.FetchListMarketplaces}`,
  async (query, { extra: api }) => {
    try {
      const queryString = getFormattedQuery(query);
      const { items, meta } = await api
        .get<AllDataServer<Marketplace>>(`${ApiRoute.GetMarketplaces}/${queryString}`)
        .then((res) => res.data);
        return {data:items, totalPages:meta.totalPages, currentPage:meta.currentPage };
      } catch (error) {
      return Promise.reject(error);
    }
  }
);

export const fetchMarketplaceById = createAsyncThunk<
  Marketplace,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.FetchMarketplaceById}`,
  async (id, { extra: api }) => {
    try {
      const { data } = await api.get<Marketplace>(`${ApiRoute.Marketplace}/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: 'destructive',
        title: 'Не удалось загрузить маркетплейс',
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const addMarketplace = createAsyncThunk<
  Marketplace,
  {name:string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.AddMarketplace}`,
  async (dto, { extra: api }) => {
    try {
      const { data } = await api.post<Marketplace>(
        `${ApiRoute.CreateMarketplace}`,
        dto
      );
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: 'destructive',
        title: 'Не удалось создать маркетплейс',
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const updateMarketplace = createAsyncThunk<
void,
{id:number, name:string},
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.UpdateMarketplace}`,
  async (dto, { dispatch, extra: api }) => {
    try {
      const data = await api.patch<Marketplace>(
        `${ApiRoute.Marketplace}/${dto.id}`,
        dto
      );
      if(data.status===200){
        dispatch(fetchMarketplaceById(dto.id));
      }
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: 'destructive',
        title: 'Не удалось обновить маркетплейс',
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);


export const deleteMarketplace = createAsyncThunk<
  number,
  number,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Marketplace}/${ActionName.DeleteMarketplace}`,
  async (id, { extra: api }) => {
    try {
      await api.delete(`${ApiRoute.Marketplace}/${id}`);
      return id;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: 'destructive',
        title: 'Не удалось удалить маркетплейс',
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);
