// import { User } from "./user.interface";

export interface CompanyGroupServer {
  group_id: number;
  group_name: string;
  // companies: Company[];
  counter: number;
  // accounts: User[];
}
export interface CompanyGroup {
  group_id: number;
  group_name: string;
  counter: number;
  companiesArr: Company[];
  // employees: number[];
}

export interface CompanyServer {
  id: number;
  company_name: string;
  marketplace_id: number;
  inn: number;
  accounts: { account_id: number }[];
  api_key: string;
  createTime: string;
  group_name_id: number;
  forma_naloga: string;
  nalog: number;
  dni_vsego: number;
  dni_wb: number;
}
// export interface Company {
//   id: number;
//   seller_name: string;
//   marketplace_id: number;
//   inn: number;
//   employees: number[];
//   api_key: string;
//   createTime: string;
//   group_id: number;
//   tax: string;
//   tax_total: number;
//   order_days: number;
//   shipment_days: number;
//   status: CompanyStatus;
// }
export interface Company {
  call_date_1: string;
  call_date_2: string;
  marketplace_id: number;
  dni_vsego: number;
  dni_wb: number;
  forma_naloga: string;
  group_id: number;
  group_name: string;
  inn: number;
  is_deleted: boolean;
  manager: string;
  nalog: number;
  seller_id: number;
  seller_name: string;
  status: string;
  totalAccounts: number;
}

export enum CompanyStatus {
  Active = "active",
  Disabled = "disabled",
}
export interface Marketplace {
  id: number;
  marketplace_name: string;
}
