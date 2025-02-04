import { PagesData } from "@/types/data-meta.interface";
import { Employee } from "@/types/employee.interface";
import { State } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSelector } from "@reduxjs/toolkit";

export const getEmployees = (
  state: Pick<State, ReducerName.Employee>
): Employee[] | null => state[ReducerName.Employee].employees;
export const getCheckedEmployees = (
  state: Pick<State, ReducerName.Employee>
): number[] | null => state[ReducerName.Employee].checkedEmployees;
export const getCompanyFilter = (
  state: Pick<State, ReducerName.Employee>
): number => state[ReducerName.Employee].companyFilter;
export const getEmployeeNameFilter = (
  state: Pick<State, ReducerName.Employee>
): string | null => state[ReducerName.Employee].nameFilter;
export const getEmployeesLoading = (
  state: Pick<State, ReducerName.Employee>
): boolean => state[ReducerName.Employee].isListLoading;
export const getEmployeePosting = (
  state: Pick<State, ReducerName.Employee>
): boolean => state[ReducerName.Employee].isEmployeePosting;
export const getHasEmployeeError = (
  state: Pick<State, ReducerName.Employee>
): boolean => state[ReducerName.Employee].hasEmployeeError;
export const getCurrentEmployeePage = (
  state: Pick<State, ReducerName.Employee>
): number => state[ReducerName.Employee].currentPage;
export const getTotalEmployeePage = (
  state: Pick<State, ReducerName.Employee>
): number => state[ReducerName.Employee].totalPages;
export const getEmployeePages = createSelector(
  [getCurrentEmployeePage, getTotalEmployeePage],
  (currentPage, totalPages): PagesData => ({ currentPage, totalPages })
);

export const getFilteredEmployees = createSelector(
  [getEmployees, getCompanyFilter, getEmployeeNameFilter],
  (employees, id, name): Employee[] | null => {
    if (!employees) return null;

    return employees.filter((employee) => {
      return (
        (!name || employee.name.toLowerCase().includes(name.toLowerCase())) &&
        (!id ||
          !employee.companies_id ||
          employee.companies_id.find((item) => item === id))
      );
    });
  }
);

export const getEmployeesByIds = (ids: number[]) =>
  createSelector(
    getEmployees,
    (employees: Employee[] | null): { id: number; name: string }[] => {
      return employees
        ? ids.map((id) => ({
            id,
            name: employees.find((e) => e.id === id)?.name ?? "",
          }))
        : [];
    }
  );
export const getCurrentEmployee = (
  state: Pick<State, ReducerName.Employee>
): Employee | null => state[ReducerName.Employee].currentEmployee;

export const getIsCurrentEmployeeLoading = (
  state: Pick<State, ReducerName.Employee>
): boolean => state[ReducerName.Employee].isCurrentEmployeeLoading;

export const getHasCurrentEmployeeError = (
  state: Pick<State, ReducerName.Employee>
): boolean => state[ReducerName.Employee].hasCurrentEmployeeError;
