import { EmployeeState } from "@/types/state.type";
import { ReducerName } from "@/utils/constant";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEmployee,
  appointCompanies,
  deleteEmployee,
  fetchEmployeeById,
  fetchEmployees,
  fetchFindEmployees,
  updateEmployee,
} from "./api-actions";

const initialState: EmployeeState = {
  employees: null,
  isListLoading: false,
  isEmployeePosting: false,
  hasEmployeeError: false,
  isEmployeeUpdating: false,
  hasListLoadingError: false,
  checkedEmployees: null,
  companyFilter: 0,
  nameFilter: null,
  totalPages: 1,
  currentPage: 1,
  // Добавлены новые свойства
  currentEmployee: null, // Данные текущего сотрудника
  isCurrentEmployeeLoading: false, // Индикатор загрузки данных сотрудника
  hasCurrentEmployeeError: false, // Ошибка при загрузке сотрудника
};

export const employeeData = createSlice({
  name: ReducerName.Employee,
  initialState,
  reducers: {
    setCheckedEmployees: (state, { payload }: PayloadAction<number | null>) => {
      if (!payload) {
        state.checkedEmployees = null;
        return;
      }
      state.checkedEmployees = state.checkedEmployees
        ? state.checkedEmployees.includes(payload)
          ? state.checkedEmployees.filter((item) => item !== payload)
          : [...state.checkedEmployees, payload]
        : [payload];
    },
    setCompanyFilter: (state, { payload }: PayloadAction<number>) => {
      state.companyFilter = payload;
    },
    setEmployeeNameFilter: (
      state,
      { payload }: PayloadAction<string | null>
    ) => {
      state.nameFilter = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload.data;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
        state.isListLoading = false;
        state.hasListLoadingError = false;
      })

      .addCase(fetchEmployees.pending, (state) => {
        state.isListLoading = true;
        state.hasListLoadingError = false;
      })

      .addCase(fetchEmployees.rejected, (state) => {
        state.isListLoading = false;
        state.hasListLoadingError = true;
      })
      .addCase(fetchEmployeeById.fulfilled, (state, { payload }) => {
        state.currentEmployee = payload; // Сохраняем данные текущего сотрудника
        state.isCurrentEmployeeLoading = false;
        state.hasCurrentEmployeeError = false;
      })
      .addCase(fetchEmployeeById.pending, (state) => {
        state.isCurrentEmployeeLoading = true;
        state.hasCurrentEmployeeError = false;
      })
      .addCase(fetchEmployeeById.rejected, (state) => {
        state.isCurrentEmployeeLoading = false;
        state.hasCurrentEmployeeError = true;
      })
      .addCase(fetchFindEmployees.fulfilled, (state, { payload }) => {
        state.employees = payload.data;
        state.totalPages = payload.totalPages;
        // state.currentPage = payload.currentPage;
        state.isListLoading = false;
        state.hasListLoadingError = false;
      })
      .addCase(fetchFindEmployees.pending, (state) => {
        state.isListLoading = true;
        state.hasListLoadingError = false;
      })
      .addCase(fetchFindEmployees.rejected, (state) => {
        state.isListLoading = false;
        state.hasListLoadingError = true;
      })
      .addCase(addEmployee.fulfilled, (state, { payload }) => {
        state.employees = state.employees
          ? [payload, ...state.employees]
          : [payload];
        state.isEmployeePosting = false;
        state.hasEmployeeError = false;
      })
      .addCase(addEmployee.pending, (state) => {
        state.isEmployeePosting = true;
        state.hasEmployeeError = false;
      })
      .addCase(addEmployee.rejected, (state) => {
        state.isEmployeePosting = false;
        state.hasEmployeeError = true;
      })
      .addCase(appointCompanies.fulfilled, (state) => {
        state.isEmployeePosting = false;
        state.hasEmployeeError = false;
      })
      .addCase(appointCompanies.pending, (state) => {
        state.isEmployeePosting = true;
        state.hasEmployeeError = false;
      })
      .addCase(appointCompanies.rejected, (state) => {
        state.hasEmployeeError = true;
        state.isEmployeePosting = false;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.isEmployeePosting = false;
        state.hasEmployeeError = false;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.isEmployeePosting = true;
        state.hasEmployeeError = false;
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.hasEmployeeError = true;
        state.isEmployeePosting = false;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        if (!state.employees || !payload) {
          return;
        }
        state.employees = state.employees?.filter(
          (item) => !payload.includes(item.id)
        );
        if (state.checkedEmployees) {
          state.checkedEmployees = state.checkedEmployees.filter(
            (item) => !payload.includes(item)
          );
        }
        state.isEmployeeUpdating = false;
      });
  },
});

export const { setCheckedEmployees, setCompanyFilter, setEmployeeNameFilter } =
  employeeData.actions;
