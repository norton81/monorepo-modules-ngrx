import { Action } from '@ngrx/store';
import { IEmployeePage } from './employee.state';
export const LOAD_EMPLOYEES_SUCCESS = 'APP1 Load Employees Success';
export class LoadEmployeeSuccessAction implements Action {
  constructor(data: IEmployeePage) {
    this.payload = data;
  }
  public payload: IEmployeePage;
  public readonly type = LOAD_EMPLOYEES_SUCCESS;
}

export const LOAD_EMPLOYEES_FAIL = 'APP1 Load Employees Success';
export class LoadEmployeeFailAction implements Action {
  public readonly type = LOAD_EMPLOYEES_FAIL;
  public payload: any;
}

export const LOAD_EMPLOYEES = 'APP1 Load Employees';
export class LoadEmployeeAction implements Action {
  public readonly type = LOAD_EMPLOYEES;
  public payload: any;
}


export const SAVE_EMPLOYEES_SUCCESS = 'APP1 SAVE Employees Success';
export class SaveEmployeeSuccessAction implements Action {
  constructor(data: IEmployeePage) {
    this.payload = data;
  }
  public payload: IEmployeePage;
  public readonly type = SAVE_EMPLOYEES_SUCCESS;
}

export const SAVE_EMPLOYEES_FAIL = 'APP1 SAVE Employees Success';
export class SaveEmployeeFailAction implements Action {
  public readonly type = SAVE_EMPLOYEES_FAIL;
  public payload: any;
}

export const SAVE_EMPLOYEES = 'APP1 SAVE Employees';
export class SaveEmployeeAction implements Action {
  constructor(data: IEmployeePage) {
    this.payload = data;
  }
  public readonly type = SAVE_EMPLOYEES;
  public payload: any;
}

export type AllEmployeeAction = LoadEmployeeSuccessAction
  | LoadEmployeeFailAction
  | LoadEmployeeAction
  | SaveEmployeeFailAction
  | SaveEmployeeAction
  | SaveEmployeeSuccessAction;
