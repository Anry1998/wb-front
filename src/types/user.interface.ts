export type UserPermissionServer = {
  id: number;
  permission_type: string;
};

export type UserPermission = {
  id: number;
  name: string;
};

export type UserRoleServer = {
  id: number;
  name: string;
  vailableEveryone: boolean;
  permissions: UserPermissionServer[];
};

export type UserRole = {
  id: number;
  name: string;
  vailableEveryone: boolean;
  permissions: UserPermission[];
};
export interface User {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  login: string;
  telegram: string;
  is_active: boolean;
  phone?: string;
  roles_id: { role_id: number }[];
  companies_id: { company_id: number }[] | null;
}
