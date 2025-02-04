import { ReducerName } from "@/utils/constant";
import { combineReducers } from "@reduxjs/toolkit";
import { userData } from "./user/user-data";
import { companyData } from "./company/company-data";
import { employeeData } from "./employee/employee-data";
import { catalogData } from "./catalog/catalog-data";
import { marketplaceData } from "./marketplace/marketplace-data";
import { roleData } from "./role/role-data";
import { groupCompanyData } from "./group-company/group-company-data";

export const rootReducer = combineReducers({
    [ReducerName.User]: userData.reducer,
    [ReducerName.Role]: roleData.reducer,
    [ReducerName.GroupCompany]: groupCompanyData.reducer,
    [ReducerName.Company]: companyData.reducer,
    [ReducerName.Marketplace]: marketplaceData.reducer,
    [ReducerName.Employee]: employeeData.reducer,
    [ReducerName.Catalog]: catalogData.reducer,
  });
