import { CatalogState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { checkNetCost, fetchNetCost, saveNetCost } from "./api-actions";

const initialState: CatalogState = {
  net_cost: null,
  taxes: null,
  spendings: null,
  self_purchases: null,
  isListLoading: false,
  hasLoadingError: false,
  totalPages: 1,
  currentPage: 1,
  checkedData: {
    net_cost: null,
  },
  checkedLoading: false,
  checkedError: false,
  currentCompanyId: 0,
};

export const catalogData = createSlice({
  name: ReducerName.Catalog,
  initialState,
  reducers: {
    clearCheckedData: (state) => {
      state.checkedData.net_cost = null;
    },
    setCurrentCompanyId: (state, { payload }: PayloadAction<number | null>) => {
      if (!payload) {
        state.currentCompanyId = 0;
      } else {
        state.currentCompanyId = payload;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchNetCost.fulfilled, (state, { payload }) => {
        state.net_cost = payload.items;
        state.isListLoading = false;
        state.totalPages = payload.meta.totalPages;
      })
      .addCase(fetchNetCost.rejected, (state) => {
        state.net_cost = null;
        state.isListLoading = false;
      })
      .addCase(fetchNetCost.pending, (state) => {
        state.isListLoading = false;
      })
      .addCase(checkNetCost.fulfilled, (state, { payload }) => {
        state.checkedData.net_cost = payload;
        state.checkedError = false;
        state.checkedLoading = false;
      })
      .addCase(checkNetCost.rejected, (state) => {
        state.checkedError = true;
        state.isListLoading = false;
      })
      .addCase(checkNetCost.pending, (state) => {
        state.checkedError = false;
        state.isListLoading = false;
      })
      .addCase(saveNetCost.pending, (state) => {
        state.isListLoading = true;
      });
  },
});
export const { clearCheckedData, setCurrentCompanyId } = catalogData.actions;
