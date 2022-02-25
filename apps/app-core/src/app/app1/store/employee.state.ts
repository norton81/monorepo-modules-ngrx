export interface IEmployee {
  firstName: string;
  secondName: string;
}

export interface IEmployeePage {
  current: IEmployee;
  employees: IEmployee[];
}
