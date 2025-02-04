import { CompanyState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addCompany,
  deleteCompany,
  fetchCompanies,
  fetchCompanyById,
  updateCompany,
} from "./api-actions";

const initialState: CompanyState = {
  companies: null,
  isCompanyUpdating: false,
  isListLoading: false,
  hasListLoadingError: false,
  employeeFilter: 0,
  nameFilter: null,
  hasCompanyError: false,
  totalPages: 1,
  currentPage: 1,
};

export const companyData = createSlice({
  name: ReducerName.Company,
  initialState,
  reducers: {
    setEmployeeFilter: (state, { payload }: PayloadAction<number>) => {
      state.employeeFilter = payload;
    },
    setCompanyNameFilter: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.nameFilter = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCompanies.pending, (state) => {
        state.isListLoading = true;
        state.hasListLoadingError = false;
      })
      .addCase(fetchCompanies.fulfilled, (state, { payload }) => {
        state.companies = payload.data;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
        state.isListLoading = false;
        state.hasListLoadingError = false;
      })
      .addCase(fetchCompanies.rejected, (state) => {
        state.isListLoading = false;
        state.hasListLoadingError = true;
      })
      .addCase(addCompany.fulfilled, (state) => {
        state.companies = state.companies ? [...state.companies] : [];

        state.isCompanyUpdating = false;
        state.hasCompanyError = false;
      })
      .addCase(addCompany.pending, (state) => {
        state.isCompanyUpdating = true;
        state.hasCompanyError = false;
      })
      .addCase(addCompany.rejected, (state) => {
        state.hasCompanyError = true;
        state.isCompanyUpdating = false;
      })
      .addCase(fetchCompanyById.fulfilled, (state, { payload }) => {
        if (!state.companies) {
          return;
        }
        const companyListIndex = state.companies.findIndex(
          (item) => item.seller_id === payload.seller_id
        );
        if (companyListIndex !== -1) {
          state.companies[companyListIndex] = { ...payload };
        }
        // state.isListLoading = false;
        state.isCompanyUpdating = false;
        state.hasCompanyError = false;
      })
      .addCase(fetchCompanyById.pending, (state) => {
        // state.isListLoading = true;
        state.isCompanyUpdating = true;
        state.hasCompanyError = false;
      })
      .addCase(updateCompany.fulfilled, (state) => {
        state.isCompanyUpdating = false;
        state.hasCompanyError = false;
      })
      .addCase(updateCompany.pending, (state) => {
        state.isCompanyUpdating = true;
        state.hasCompanyError = false;
      })
      .addCase(updateCompany.rejected, (state) => {
        state.hasCompanyError = true;
        state.isCompanyUpdating = false;
      })
      .addCase(deleteCompany.fulfilled, (state) => {
        state.isCompanyUpdating = false;
        state.hasCompanyError = false;
      })
      .addCase(deleteCompany.rejected, (state) => {
        state.hasCompanyError = true;
        state.isCompanyUpdating = false;
      });
  },
});
export const { setEmployeeFilter, setCompanyNameFilter } = companyData.actions;
