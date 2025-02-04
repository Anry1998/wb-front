import { store } from "@/store/index.js";
import { User, UserRole } from "./user.interface";
import { AuthorizationStatus } from "@/utils/constant";
import { Employee } from "./employee.interface";
import { Company, CompanyGroup, Marketplace } from "./company.interface";
import {
  NetCost,
  NetCostServer,
  SelfPurchase,
  Spending,
  Tax,
} from "./catalog.interface";
import { AxiosError } from "axios";

export type State = ReturnType<typeof store.getState>;
export type AppRequestError = AxiosError<{ message: string }>;
export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authStatus: AuthorizationStatus;
  hasAuthError: boolean;
  user: User | null;
  isAuthLoading: boolean;
  isUserLoading: boolean;
  hasUserError: boolean;
};

export type RoleState = {
  userRoles: UserRole[] | null;
  rolesList: UserRole[] | null;
  isRoleLoading: boolean;
  isRolePosting: boolean;
  hasRoleError: boolean;
  totalPages: number;
  currentPage: number;
};

export type GroupCompanyState = {
  group_companies: CompanyGroup[] | null;
  companies_for_search: Company[] | null;
  isGroupPosting: boolean;
  isListLoading: boolean;
  hasListLoadingError: boolean;
  employeeFilter: number;
  nameFilter: string | null;
  hasCompanyGroupError: boolean;
  totalPages: number;
  currentPage: number;
  current_group_name: string | undefined;
};

export type CompanyState = {
  companies: Company[] | null;
  isCompanyUpdating: boolean;
  isListLoading: boolean;
  hasListLoadingError: boolean;
  employeeFilter: number;
  nameFilter: string | null;
  hasCompanyError: boolean;
  totalPages: number;
  currentPage: number;
};

export type MarketplaceState = {
  marketplaces: Marketplace[] | null;
  isMarketplacesLoading: boolean;
  isMarketplacePosting: boolean;
  hasMarketplaceError: boolean;
  nameFilter: string | null;
  totalPages: number;
  currentPage: number;
};

export type EmployeeState = {
  employees: Employee[] | null;
  checkedEmployees: number[] | null;
  isEmployeePosting: boolean;
  isEmployeeUpdating: boolean;
  isListLoading: boolean;
  hasEmployeeError: boolean;
  hasListLoadingError: boolean;
  companyFilter: number;
  nameFilter: string | null;
  totalPages: number;
  currentPage: number;
  currentEmployee: Employee | null;
  isCurrentEmployeeLoading: boolean;
  hasCurrentEmployeeError: boolean;
};

export type CatalogState = {
  net_cost: NetCost[] | null;
  taxes: Tax[] | null;
  spendings: Spending[] | null;
  self_purchases: SelfPurchase[] | null;
  isListLoading: boolean;
  hasLoadingError: boolean;
  totalPages: number;
  currentPage: number;
  checkedData: {
    net_cost: NetCostServer[] | null;
  };
  checkedLoading: boolean;
  checkedError: boolean;
  currentCompanyId: number;
};
