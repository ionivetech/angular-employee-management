import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Models
import type { employeeModel } from '@src/app/models/employee.model';
// Dummy
import dummy from '@src/assets/dummyData.json';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employee = new BehaviorSubject<employeeModel[]>([]);

  constructor() {
    this._employee.next(dummy);
  }

  get employee$() {
    return this._employee.asObservable();
  }

  // Add new data employee
  addEmployee(value: employeeModel): void {
    const dataEmployee = this._employee.getValue();
    dataEmployee.unshift(value);
    this._employee.next(dataEmployee);
  }

  // Edit data employee
  editEmployee(value: employeeModel, index: number): void {
    const dataEmployee = this._employee.getValue();
    dataEmployee[index] = value;
    this._employee.next(dataEmployee);
  }

  // Delete data employee
  deleteEmployee(index: number): void {
    const dataEmployee = this._employee.getValue();
    dataEmployee.splice(index, 1);
    this._employee.next(dataEmployee);
  }
}
