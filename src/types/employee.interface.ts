export interface EmployeeServer {
  id: number;
  group_id: number;
  roles: { role_id: number }[];
  login: string;
  telegram: string;
  name: string;
  surname: string;
  patronymic: string;
  companyes: { company_id: number }[];
}
export interface Employee {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  roles_id: number[];
  group_id: number;
  login: string;
  telegram: string;
  companies_id: number[];
}
