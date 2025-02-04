export const AppRoute = {
  Auth: "/auth",
  Personal: "/personal",
  Profile: "profile",
  GroupCompanies: "groups",
  Companies: "companies",
  Employees: "employees",
  Catalog: "catalog",
  Reports: "reports",
  Roles: "roles",
  Marketplaces: "marketplaces",
  EditRole: "editrole",
  EditCompany: "editcompany",
  EditEmployee: "editemployee",
  AddEmployee: "addemployee",
  EditGroupCompany: "editgroupcompany",
} as const;

export const ApiRoute = {
  Login: "auth/login",
  Logout: "auth/logout",
  Refresh: "auth/refresh",
  Account: "account",
  GetAccounts: "account/all",
  FindAccounts: "account/find",
  CreateAccount: "account/create",
  Company: "company",
  GetCompanies: "company/all",
  CreateCompany: "company/create",
  CompaniesGroup: "companies-group",
  GetCompaniesGroup: "companies-group/all",
  CreateCompaniesGroup: "companies-group/create",
  Role: "role",
  GetRoles: "role/all",
  CreateRole: "role/create",
  GetPermissions: "permission/all",
  Marketplace: "marketplace",
  GetMarketplaces: "marketplace/all",
  CreateMarketplace: "marketplace/create",
  GetNetCost: "rb-sebestoimost/all",
  CheckNetCost: "rb-sebestoimost/pars",
  UploadNetCost: "rb-sebestoimost/import-arr",
  SaveExampleNetCost: "rb-sebestoimost/download",
} as const;

export enum AuthorizationStatus {
  Auth = "AUTH",
  NoAuth = "NO_AUTH",
  Unknown = "Unknown",
}

export enum ReducerName {
  User = "USER",
  Role = "ROLE",
  GroupCompany = "GROUP_COMPANY",
  Company = "COMPANY",
  Marketplace = "MARKETPLACE",
  Employee = "EMPLOYEE",
  Catalog = "CATALOG",
}

export const ActionName = {
  Login: "login",
  Logout: "logout",
  CheckUserLogin: "checkUserLogin",
  FetchUser: "fetch-user",
  FetchUserRoles: "fetch-user-roles",
  FetchListRoles: "fetch-list-roles",
  FetchEmployeeById: "fetch-employee-by-id",
  FetchRoleById: "fetch-role",
  AddRole: "add-role",
  UpdateRole: "update-role",
  DeleteRole: "delete-role",
  FetchListEmployees: "fetch-list-employees",
  FindListEmployees: "find-list-employees",
  AddEmployee: "add-employee",
  UpdateEmployee: "update-employee",
  AppointCompamies: "appoint-companies",
  DeleteEmployee: "delete-employee",
  FetchListGroupCompanies: "fetch-list-group-companies",
  FetchGroupCompanies: "fetch-group-companies",
  FetchGroupCompanyById: "fetch-group-company",
  AddGroupCompany: "add-group-company",
  UpdateGroupCompany: "update-group-company",
  DeleteGroupCompany: "delete-group-company",
  FetchListCompanies: "fetch-list-companies",
  FetchCompanies: "fetch-companies",
  FetchCompanyById: "fetch-company",
  AddCompany: "add-company",
  UpdateCompany: "update-company",
  DeleteCompany: "delete-company",
  FetchCatalog: "fetch-catalog",
  FetchNetCost: "fetch-net-cost",
  CheckNetCost: "check-net-cost",
  SaveExampleNetCost: "save-example-net-cost",
  UploadNetCost: "upload-net-cost",
  FetchListMarketplaces: "fetch-marketplaces",
  FetchMarketplaceById: "fetch-marketplace",
  AddMarketplace: "add-marketplace",
  UpdateMarketplace: "update-marketplace",
  DeleteMarketplace: "delete-marketplace",
} as const;

export const TextColorVariants = {
  dark: "text-purple-0",
  light: "text-purple-925",
};

export const BackgroundColorVariants = {
  dark: "bg-purple-800",
  light: "bg-purple-0",
  login: "bg-purple-50",
};

export const SecondaryColorVariants = {
  dark: "bg-purple-600",
  light: "bg-purple-10",
};

export const CatalogTabsToName = {
  net_cost: "Себестоимость",
  taxes: "Налоги",
  spendings: "Затраты",
  self_purchases: "Самовыкупы",
};

export const CardFieldToName = {
  companies: "Компании",
  employees: "Сотрудники",
  telegram: "Телеграм",
  login: "Логин",
  group: "Группа",
  permissions: "Разрешений",
};

export const rowsPerPageParams = [7, 14, 28, 56];

export const DEFAULT_QUERY_LIMIT = 12;

export const CompanyStatusToName = {
  Active: "Активный",
  Disabled: "Заблокированный",
};
