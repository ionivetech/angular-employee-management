import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// Models
import { userModel } from '@models/user.model';
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
}
