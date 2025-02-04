import { GroupCompanyState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addGroupCompany,
  deleteGroupCompany,
  fetchGroupCompanies,
  fetchGroupCompanyById,
  updateGroupCompany,
} from "./api-actions";

const initialState: GroupCompanyState = {
  group_companies: null,
  companies_for_search: null,
  isGroupPosting: false,
  isListLoading: false,
  hasListLoadingError: false,
  employeeFilter: 0,
  nameFilter: null,
  hasCompanyGroupError: false,
  totalPages: 1,
  currentPage: 1,
  current_group_name: "",
};

export const groupCompanyData = createSlice({
  name: ReducerName.GroupCompany,
  initialState,
  reducers: {
    setEmployeeGroupFilter: (state, { payload }: PayloadAction<number>) => {
      state.employeeFilter = payload;
    },
    setCompanyNameGroupFilter: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.nameFilter = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchGroupCompanies.pending, (state) => {
        // state.currentPage = payload.currentPage;
        state.isListLoading = true;
      })
      .addCase(fetchGroupCompanies.fulfilled, (state, { payload }) => {
        state.group_companies = payload.data;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
        state.isListLoading = false;
        state.hasListLoadingError = false;
      })
      .addCase(fetchGroupCompanies.rejected, (state) => {
        state.group_companies = null;
        state.isListLoading = false;
        state.hasListLoadingError = true;
      })
      .addCase(addGroupCompany.fulfilled, (state) => {
        state.group_companies = state.group_companies
          ? [...state.group_companies]
          : [];
        // : [...state.group_companies];
        state.isGroupPosting = false;
      })
      .addCase(addGroupCompany.pending, (state) => {
        state.isGroupPosting = true;
        state.hasCompanyGroupError = false;
      })
      .addCase(addGroupCompany.rejected, (state) => {
        state.isGroupPosting = false;
        state.hasCompanyGroupError = true;
      })
      .addCase(fetchGroupCompanyById.fulfilled, (state, { payload }) => {
        if (!state.group_companies) {
          return;
        }
        state.companies_for_search = payload.companiesArr;
        const groupIndex = state.group_companies.findIndex(
          (item) => item.group_id === payload.group_id
        );
        if (groupIndex !== -1) {
          state.group_companies[groupIndex] = { ...payload };
        }
        state.isGroupPosting = false;
        state.current_group_name = payload.group_name;

        state.hasCompanyGroupError = false;
      })
      .addCase(updateGroupCompany.fulfilled, (state) => {
        state.isGroupPosting = false;
        state.hasCompanyGroupError = false;
      })
      .addCase(updateGroupCompany.pending, (state) => {
        state.isGroupPosting = true;
        state.hasCompanyGroupError = false;
      })
      .addCase(updateGroupCompany.rejected, (state) => {
        state.isGroupPosting = true;
        state.hasCompanyGroupError = false;
      })
      .addCase(deleteGroupCompany.fulfilled, (state) => {
        state.isGroupPosting = false;
        state.hasCompanyGroupError = false;
      });
  },
});
export const { setEmployeeGroupFilter, setCompanyNameGroupFilter } =
  groupCompanyData.actions;
