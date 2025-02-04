export class UpdateEmployeeDto {
  public id!: number;

  public name?: string;

  public surname?: string;

  public patronymic?: string;

  public telegram?: string;

  public password?: string;

  public roles_id?: number[];

  public companies_id?: number[];

  public group_id?: number;
}
