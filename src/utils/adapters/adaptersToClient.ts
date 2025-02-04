import { NetCost, NetCostServer } from "@/types/catalog.interface";
// import {
//   Company,
//   // CompanyGroup,
//   // CompanyGroupServer,
//   CompanyServer,
//   // CompanyStatus,
// } from "@/types/company.interface";
import { Employee, EmployeeServer } from "@/types/employee.interface";
import { UserPermission, UserPermissionServer } from "@/types/user.interface";
import { format } from "date-fns";

// export const adaptCompanyToClient = (data: CompanyServer): Company => {
//   const {
//     // id,
//     // company_name,
//     // marketplace_id,
//     inn,
//     accounts,
//     // api_key,
//     // createTime,
//     group_name_id,
//     forma_naloga = "УСН",
//     nalog = 0,
//     dni_vsego = 0,
//     dni_wb = 0,
//   } = data;
//   // const employees = accounts.map(({ account_id }) => account_id);
//   return {
//     // id,
//     // name: company_name,
//     // marketplace_id,
//     inn,
//     // employees,
//     // api_key,
//     // createTime,
//     group_id: group_name_id,
//     forma_naloga: forma_naloga,
//     nalog: nalog,
//     dni_vsego: dni_vsego,
//     dni_wb: dni_wb,
//     status: CompanyStatus.Active,
//   };
// };

// export const adaptCompaniesToClient = (data: CompanyServer[]): Company[] => {
//   // return data.map((item) => adaptCompanyToClient(item));
// };

// export const adaptGroupToClient = (data: CompanyGroupServer): CompanyGroup => {
//   const { id, name, accounts, companies: fullCompanies } = data;
//   const employees = accounts.map(({ id }) => id);
//   const companies = fullCompanies.map(({ id }) => id);
//   return {
//     id,
//     name,
//     employees,
//     companies,
//   };
// };

// export const adaptGroupsToClient = (
//   data: CompanyGroupServer[]
// ): CompanyGroup[] => {
//   return data.map((item) => adaptGroupToClient(item));
// };

export const adaptEmployeeToClient = (data: EmployeeServer): Employee => {
  const {
    id,
    name,
    surname,
    patronymic,
    roles: roleIds,
    companyes,
    login,
    group_id,
    telegram,
  } = data;
  const roles_id = roleIds.map(({ role_id }) => role_id);
  const companies_id = companyes.map(({ company_id }) => company_id);
  return {
    id,
    roles_id,
    login,
    name,
    surname,
    patronymic,
    telegram,
    companies_id,
    group_id,
  };
};

export const adaptEmployeesToClient = (data: EmployeeServer[]): Employee[] => {
  return data.map((item) => adaptEmployeeToClient(item));
};

export const adaptPermissionToClient = (
  data: UserPermissionServer
): UserPermission => {
  const { id, permission_type } = data;
  return {
    id,
    name: permission_type,
  };
};

export const adaptPermissionsToClient = (
  data: UserPermissionServer[]
): UserPermission[] => {
  return data.map((item) => adaptPermissionToClient(item));
};

export const adaptNetCostToClient = (data: NetCostServer): NetCost => {
  // const { id, date, company_id, article, article_seller, barcode, cost } = data;
  const {
    sebes_date,
    new_date,
    sebestoimost,
    new_sebestoimost,
    artikul,
    barkod,
  } = data;

  const parsedDate2 = new Date(new_date);
  const adaptedDate = format(parsedDate2, "yyyy-MM-dd");
  const parsedDate1 = new Date(sebes_date);
  const adaptedDate1 = format(parsedDate1, "yyyy-MM-dd");
  return {
    sebes_date: adaptedDate1,
    new_date: adaptedDate,
    new_sebestoimost,
    artikul,
    sebestoimost,
    barkod,
    // id,
    // date: adaptedDate,
    // company: company_id.toString(),
    // article,
    // seller_article: article_seller,
    // barcode,
    // cost,
  };
};

export const adaptNetCostListToClient = (data: NetCostServer[]): NetCost[] => {
  return data.map((item) => adaptNetCostToClient(item));
};
