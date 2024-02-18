import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// Components
import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {}
