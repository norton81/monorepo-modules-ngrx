import { IAppState } from '../../store/app.state';
import { AllEmployeeAction, LOAD_EMPLOYEES_SUCCESS, SAVE_EMPLOYEES_SUCCESS } from './employee.action';

export function employeeReducer(state: IAppState, action: AllEmployeeAction) {
  switch (action.type){
    case LOAD_EMPLOYEES_SUCCESS:
    case SAVE_EMPLOYEES_SUCCESS:
      return {
        ...state || {},
        ...action.payload
      }
  }
  return state;
}
