import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  user$: Observable<User | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.getUser();
  }


  logoutUser() {
    return this.auth.logout(), this.router.navigate(['/login']), console.log('logout erfolgreich');
  }

}
