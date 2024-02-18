import { Routes } from '@angular/router';
// Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeeComponent } from './dashboard/employee/employee.component';
import { EmployeeAddComponent } from './dashboard/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './dashboard/employee/employee-edit/employee-edit.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'employee',
        pathMatch: 'full',
      },
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'add-employee',
        component: EmployeeAddComponent,
      },
      {
        path: 'edit-employee/:username',
        component: EmployeeEditComponent,
      },
    ],
  },
];
