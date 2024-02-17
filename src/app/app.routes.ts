import { Routes } from '@angular/router';
// Components
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './dashboard/user/user.component';
import { UserAddComponent } from './dashboard/user/user-add/user-add.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/add',
        component: UserAddComponent,
      },
    ],
  },
];
