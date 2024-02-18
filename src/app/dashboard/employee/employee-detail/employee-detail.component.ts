import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
// Services
import { EmployeeService } from '@services/employee.service';
// Models
import type { employeeModel } from '@src/app/models/employee.model';
// Pipes
import { PriceFormatPipe } from '@pipes/priceFormat.pipe';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [RouterLink, CommonModule, PriceFormatPipe],
  templateUrl: './employee-detail.component.html',
})
export class EmployeeDetailComponent {
  username: string = '';
  employeeDetail: employeeModel | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location
  ) {
    // Get username from url
    this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
    });

    // Get detail employee by username from services
    const employeeServiceSubscribe = this.employeeService.employee$.subscribe(
      (employee) => {
        const findData = employee.find((e) => e.username === this.username);
        if (findData) {
          this.employeeDetail = JSON.parse(JSON.stringify(findData));

          if (this.employeeDetail) {
            this.employeeDetail.birthDate = new Date(
              Number(this.employeeDetail.birthDate) * 1000
            );
          }
        }
      }
    );
    employeeServiceSubscribe.unsubscribe();
  }

  // Back to previous page
  backToList(): void {
    this.location.back();
  }
}
