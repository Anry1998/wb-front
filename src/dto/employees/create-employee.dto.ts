export class CreateEmployeeDto {
  public name!: string;

  public surname!: string;

  public patronymic?: string;

  public login!: string;

  public telegram?: string;

  public password!: string;

  public roles_id!: number[];

  public companies_id?: number[];
}
