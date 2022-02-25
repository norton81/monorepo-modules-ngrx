import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import {
  LOAD_EMPLOYEES,
  LoadEmployeeFailAction,
  LoadEmployeeSuccessAction,
  SAVE_EMPLOYEES,
  SaveEmployeeFailAction,
  SaveEmployeeSuccessAction
} from './employee.action';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class EmployeeEffects {
  @Effect()
  loadEmployee$ = this.actions$.pipe(
    ofType(LOAD_EMPLOYEES),
    mergeMap(() =>
      this.service.getEmployeeEx().pipe(
        map(
          (data: any) =>
            new LoadEmployeeSuccessAction(data)
        ),
        catchError(() => of(new LoadEmployeeFailAction()))
      )
    )
  );

  @Effect()
  saveEmployee$ = this.actions$.pipe(
    ofType(SAVE_EMPLOYEES),
    mergeMap((action: any) =>
      this.service.saveEmployeeEx(action.payload).pipe(
        map(
          (action: any) =>
            new SaveEmployeeSuccessAction(action)
        ),
        catchError(() => of(new SaveEmployeeFailAction()))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private service: EmployeeService
  ) {}
}
