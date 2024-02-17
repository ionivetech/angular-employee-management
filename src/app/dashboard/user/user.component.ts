import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
// Services
import { EmployeeService } from '@services/employee.service';
// Models
import { userModel } from '@models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  employeeServiceSubscribe: Subscription;
  dataEmployee: userModel[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {
    this.employeeServiceSubscribe = this.employeeService.employee$.subscribe(
      (employee) => {
        this.dataEmployee = employee;
      }
    );
  }

  ngOnDestroy() {
    this.employeeServiceSubscribe.unsubscribe();
  }
}