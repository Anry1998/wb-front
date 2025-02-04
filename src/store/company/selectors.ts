import { Company } from "@/types/company.interface";
import { PagesData } from "@/types/data-meta.interface";
import { State } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getHasCompanyError = (
  state: Pick<State, ReducerName.Company>
): boolean => state[ReducerName.Company].hasCompanyError;
export const getCompanyUpdating = (
  state: Pick<State, ReducerName.Company>
): boolean => state[ReducerName.Company].isCompanyUpdating;
export const getLoading = (state: Pick<State, ReducerName.Company>): boolean =>
  state[ReducerName.Company].isListLoading;
export const getAllCompanies = (
  state: Pick<State, ReducerName.Company>
): Company[] | null => state[ReducerName.Company].companies;
export const getCurrentCompanyPage = (
  state: Pick<State, ReducerName.Company>
): number => state[ReducerName.Company].currentPage;
export const getTotalCompanyPage = (
  state: Pick<State, ReducerName.Company>
): number => state[ReducerName.Company].totalPages;
export const getCompanyPages = createSelector(
  [getCurrentCompanyPage, getTotalCompanyPage],
  (currentPage, totalPages): PagesData => ({ currentPage, totalPages })
);

export const getEmployeeFilter = (
  state: Pick<State, ReducerName.Company>
): number => state[ReducerName.Company].employeeFilter;
export const getNameFilter = (
  state: Pick<State, ReducerName.Company>
): string | null => state[ReducerName.Company].nameFilter;

// export const getFilteredCompanies = createSelector(
//   [getAllCompanies, getEmployeeFilter, getNameFilter],
//   (companies, name): Company[] | null => {
//     if (!companies) return null;
//     return companies.filter((company) => {
//       return (
//         !name || company.seller_name.toLowerCase().includes(name.toLowerCase())
//         // (!id || company.employees?.includes(id))
//       );
//     });
//   }
// );
