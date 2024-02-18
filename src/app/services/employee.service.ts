import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Models
import type { userModel } from '@models/user.model';
// Dummy
import dummy from '@src/assets/dummyData.json';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private _employee = new BehaviorSubject<userModel[]>([]);

  constructor() {
    this._employee.next(dummy);
  }

  get employee$() {
    return this._employee.asObservable();
  }

  // Add new data employee
  addEmployee(value: userModel): void {
    const dataEmployee = this._employee.getValue();
    dataEmployee.unshift(value);
    this._employee.next(dataEmployee);
  }
}
