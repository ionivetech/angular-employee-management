import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Services
import { EmployeeService } from '@services/employee.service';
// Models
import type { employeeModel } from '@src/app/models/employee.model';
import type { Subscription } from 'rxjs';
// Components
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    TableModule,
    InputTextModule,
    TagModule,
  ],
  templateUrl: './employee.component.html',
})
export class EmployeeComponent {
  employeeServiceSubscribe: Subscription;
  masterEmployee: employeeModel[] = [];
  _dataEmployee: employeeModel[] = [];
  search: string = '';
  debounceSearch: any;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Subscribe and get data employee from services
    this.employeeServiceSubscribe = this.employeeService.employee$.subscribe(
      (employee) => {
        this.masterEmployee = employee;
      }
    );
  }

  ngOnInit() {
    this._dataEmployee = JSON.parse(JSON.stringify(this.masterEmployee));

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['q']) {
        this.search = params['q'];
        this.searchDataEmployee();
      }
    });
  }

  // Data employee
  get dataEmployee(): employeeModel[] {
    return this._dataEmployee;
  }
  set dataEmployee(value: employeeModel[]) {
    this._dataEmployee = value;
  }

  // Handle input search
  handleSearch(): void {
    if (this.debounceSearch) clearTimeout(this.debounceSearch);
    this.debounceSearch = setTimeout(() => {
      this.searchDataEmployee();
    }, 1000);
  }

  // Search data employee
  searchDataEmployee() {
    if (this.search) {
      const filtered = this.dataEmployee.filter(
        (data) =>
          data.username.toLowerCase().includes(this.search.toLowerCase()) ||
          data.firstName.toLowerCase().includes(this.search.toLowerCase())
      );
      this.dataEmployee = filtered;

      // Update query params
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams: { q: this.search },
        queryParamsHandling: 'merge',
      });
    } else {
      this.dataEmployee = JSON.parse(JSON.stringify(this.masterEmployee));

      // Clear query params
      this.router.navigate(['/dashboard/employee']);
    }
  }

  // Go to edit page
  editEmployee(username: string): void {
    this.router.navigateByUrl(`/dashboard/edit-employee/${username}`);
  }

  ngOnDestroy() {
    // Unsubscrice employee services
    this.employeeServiceSubscribe.unsubscribe();
  }
}
