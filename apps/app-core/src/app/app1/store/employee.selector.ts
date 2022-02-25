import { IAppState } from '../../store/app.state';

export const selectEmployee = (state: IAppState) => {
  return state?.employee;
}
