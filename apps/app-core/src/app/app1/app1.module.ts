import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { App1Component } from "./app1.component";
import { App1RotingModule } from "./app1-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from './services/employee.service';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/employee.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/employee.effects';

@NgModule({
  imports: [
    CommonModule,
    App1RotingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forFeature('employee', employeeReducer),
    EffectsModule.forFeature([EmployeeEffects]),
  ],
  providers: [EmployeeService],
  declarations: [App1Component]
})
export class App1Module { }
