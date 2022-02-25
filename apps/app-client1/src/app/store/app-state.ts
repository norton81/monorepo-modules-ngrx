interface IEmployee {
  firstName: string;
  secondName: string;
}

interface IEmployeePage {
  current: IEmployee;
  employees: IEmployee[];
}

export interface IAppState {
  employee?: IEmployeePage;
}
