import { Company, CompanyGroup } from "@/types/company.interface";
import { PagesData } from "@/types/data-meta.interface";
import { State } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getGroupCompanies = (
  state: Pick<State, ReducerName.GroupCompany>
): CompanyGroup[] | null => state[ReducerName.GroupCompany].group_companies;
export const getCompanyForSearch = (
  state: Pick<State, ReducerName.GroupCompany>
): Company[] | null => state[ReducerName.GroupCompany].companies_for_search;
export const getCurrentGroupName = (
  state: Pick<State, ReducerName.GroupCompany>
): string | undefined => state[ReducerName.GroupCompany].current_group_name;

export const getHasGroupError = (
  state: Pick<State, ReducerName.GroupCompany>
): boolean => state[ReducerName.GroupCompany].hasCompanyGroupError;
export const getGroupPosting = (
  state: Pick<State, ReducerName.GroupCompany>
): boolean => state[ReducerName.GroupCompany].isGroupPosting;
export const getGroupLoading = (
  state: Pick<State, ReducerName.GroupCompany>
): boolean => state[ReducerName.GroupCompany].isListLoading;
export const getCurrentGroupPage = (
  state: Pick<State, ReducerName.GroupCompany>
): number => state[ReducerName.GroupCompany].currentPage;
export const getTotalGroupPage = (
  state: Pick<State, ReducerName.GroupCompany>
): number => state[ReducerName.GroupCompany].totalPages;
export const getGroupPages = createSelector(
  [getCurrentGroupPage, getTotalGroupPage],
  (currentPage, totalPages): PagesData => ({ currentPage, totalPages })
);

export const getEmployeeGroupFilter = (
  state: Pick<State, ReducerName.GroupCompany>
): number => state[ReducerName.GroupCompany].employeeFilter;
export const getNameFilter = (
  state: Pick<State, ReducerName.GroupCompany>
): string | null => state[ReducerName.GroupCompany].nameFilter;

export const getFilteredGroups = createSelector(
  [getGroupCompanies, getEmployeeGroupFilter, getNameFilter],

  (companyGroups): CompanyGroup[] | null => {
    if (!companyGroups) return null;
    return companyGroups;
  }
);
