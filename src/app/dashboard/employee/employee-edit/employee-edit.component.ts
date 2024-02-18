import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
// Services
import { EmployeeService } from '@services/employee.service';
// Models
import type { employeeModel } from '@src/app/models/employee.model';
// Components
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
// Toast
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-employee-edit',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './employee-edit.component.html',
})
export class EmployeeEditComponent {
  username: string = '';
  employeeDataIndex: number = 0;
  employeeDetail: employeeModel | null = null;
  employeeForm: FormGroup | null = null;
  maxDate: Date | undefined;
  statusOptions: { value: string; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];
  groupOptions: { value: string; label: string }[] = [
    { value: 'Finance', label: 'Finance' },
    { value: 'Accounting', label: 'Accounting' },
    { value: 'Design Graphic', label: 'Design Graphic' },
    { value: 'Human Resource', label: 'Human Resource' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Presales', label: 'Presales' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Product', label: 'Product' },
    { value: 'Legal', label: 'Legal' },
    { value: 'GA', label: 'GA' },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    // Get username from url
    this.activatedRoute.params.subscribe((params) => {
      this.username = params['username'];
    });

    // Get detail employee by username from services
    const employeeServiceSubscribe = this.employeeService.employee$.subscribe(
      (employee) => {
        const findIndex = employee.findIndex(
          (e) => e.username === this.username
        );
        if (findIndex > -1) {
          this.employeeDetail = employee[findIndex];
          this.employeeDataIndex = findIndex;
        }
      }
    );
    employeeServiceSubscribe.unsubscribe();
  }

  ngOnInit() {
    this.maxDate = new Date();

    // Create forms
    this.employeeForm = this.formBuilder.group({
      username: [this.employeeDetail?.username || '', Validators.required],
      firstName: [this.employeeDetail?.firstName || '', Validators.required],
      lastName: [this.employeeDetail?.lastName || '', Validators.required],
      email: [
        this.employeeDetail?.email || '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      birthDate: [
        this.epochToDate(this.employeeDetail?.birthDate),
        Validators.required,
      ],
      basicSalary: [
        this.employeeDetail?.basicSalary || '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
        ]),
      ],
      status: [this.employeeDetail?.status || '', Validators.required],
      group: [this.employeeDetail?.group || '', Validators.required],
      description: [
        this.employeeDetail?.description || '',
        Validators.required,
      ],
    });
  }

  // Convert epoch to date
  epochToDate(epoch: string | Date | undefined): Date | string {
    if (epoch) {
      if (typeof epoch === 'string') return new Date(Number(epoch) * 1000);
      else return epoch;
    }
    return '';
  }

  // Handle submit form
  submitForm(): void {
    if (this.employeeForm && this.employeeForm.valid) {
      const dataForm = this.employeeForm.value;
      dataForm.birthDate = new Date(dataForm.birthDate).getTime() / 1000;

      this.employeeService.editEmployee(dataForm, this.employeeDataIndex);
      this.router.navigateByUrl('/dashboard/employee');

      // Show toast
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee update successfully',
      });
    }
  }
}
