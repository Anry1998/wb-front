import { toast } from "@/hooks/use-toast";
import { NetCost, NetCostServer } from "@/types/catalog.interface";
import { Query } from "@/types/query.type";
import { AppDispatch, AppRequestError, State } from "@/types/state.type";
import { adaptFileToServer } from "@/utils/adapters/adaptToServer";
import { ActionName, ApiRoute, ReducerName } from "@/utils/constant";
import { getFormattedQuery } from "@/utils/helpers";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import * as FileSaver from "file-saver";

export const fetchNetCost = createAsyncThunk<
  { items: NetCost[]; meta: { totalPages: number } },
  { query?: Query; id: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Catalog}/${ActionName.FetchNetCost}`,
  async ({ query, id }, { extra: api }) => {
    try {
      const queryString = getFormattedQuery({ ...query });
      const { data } = await api
        .get<{ items: NetCost[]; meta: { totalPages: number } }>(
          `${ApiRoute.GetNetCost}${queryString}&campony_id=${id}`
        )
        .then((res) => res);
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить данные",
        description: axiosError.response?.data.message,
        duration: 900000,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const checkNetCost = createAsyncThunk<
  NetCostServer[],
  { file: File; id: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Catalog}/${ActionName.CheckNetCost}`,
  async ({ file, id }, { extra: api }) => {
    try {
      const data = await api
        .post<NetCostServer[]>(
          `${ApiRoute.CheckNetCost}?campony_id=${id}`,
          adaptFileToServer(file)
        )
        .then((res) => res.data);
      return data;
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось проверить файл",
        duration: 900000,
        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const saveNetCost = createAsyncThunk<
  void,
  { data: NetCostServer[]; id: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Catalog}/${ActionName.UploadNetCost}`,
  async ({ data, id }, { dispatch, extra: api }) => {
    try {
      if (!data.length) {
        throw new Error("No data found");
      }
      const { status } = await api.post<NetCostServer[]>(
        `${ApiRoute.UploadNetCost}?campony_id=${id}`,
        data
      );
      if (status === 201) {
        dispatch(fetchNetCost({ id: id }));
      }
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось загрузить файл",
        duration: 900000,

        description: axiosError.response?.data.message,
      });
      return Promise.reject(axiosError);
    }
  }
);

export const saveExampleNetCost = createAsyncThunk<
  void,
  { id: number; pattern: number },
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  `${ReducerName.Catalog}/${ActionName.SaveExampleNetCost}`,
  async ({ id, pattern }, { extra: api }) => {
    try {
      const res = await api.get(
        `${ApiRoute.SaveExampleNetCost}?campony_id=${id}&pattern=${pattern}`,
        {
          responseType: "blob",
        }
      );
      const contentDisposition = res.headers?.["content-disposition"];
      let filename = "default-file.xlsx";

      if (contentDisposition) {
        const match = contentDisposition.match(/filename="?(.+?)"?$/);
        if (match && match[1]) {
          filename = decodeURIComponent(match[1]);
        }
      }
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      FileSaver.saveAs(blob, filename);
    } catch (error) {
      const axiosError = error as AppRequestError;
      toast({
        variant: "destructive",
        title: "Не удалось сформировать файл",
        duration: 900000,

        description:
          axiosError.response?.data.message ?? axiosError.request.statusText,
      });
      return Promise.reject(axiosError);
    }
  }
);
