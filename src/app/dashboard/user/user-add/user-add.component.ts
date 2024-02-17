import { Component } from '@angular/core';
// Services
import { EmployeeService } from '@services/employee.service';
// Models
import { userModel } from '@models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  employeeServiceSubscribe: Subscription;
  dataEmployee: userModel[] = [];

  constructor(private employeeService: EmployeeService) {
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
