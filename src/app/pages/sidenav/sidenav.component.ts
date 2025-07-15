import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  imports: [RouterModule, MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  dashboardActive: boolean = false;

  constructor(private router: Router) {

  }

 
}
