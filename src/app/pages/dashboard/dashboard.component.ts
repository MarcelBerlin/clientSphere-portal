import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase/auth';
import { FooterComponent } from '../footer/footer.component';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
   
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tickets$!: Observable<any>;

  user$: Observable<User | null>;

  constructor(private auth: AuthService, private ticketService: TicketService, private router: Router) {
    this.user$ = this.auth.getUser();
  }

ngOnInit(): void {
    this.tickets$ = this.ticketService.getTickets();
  }


}
