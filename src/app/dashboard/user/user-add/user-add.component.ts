import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
// Services
import { EmployeeService } from '@services/employee.service';
// Components
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
// Toast
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-user-add',
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
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss',
})
export class UserAddComponent {
  employeeForm: FormGroup;
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
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private messageService: MessageService
  ) {
    // Create forms
    this.employeeForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      birthDate: ['', Validators.required],
      basicSalary: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.minLength(6),
        ]),
      ],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  // Handle submit form
  submitForm(): void {
    if (this.employeeForm.valid) {
      const dataForm = this.employeeForm.value;
      dataForm.birthDate = new Date(dataForm.birthDate).getTime() / 1000;

      this.employeeService.addEmployee(dataForm);
      this.router.navigateByUrl('/dashboard/users');

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Employee added successfully',
      });
    }
  }
}
