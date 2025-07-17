import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { map, Observable, Observer } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FooterComponent } from '../footer/footer.component';
import { Ticket, TicketService } from '../../services/ticket.service';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule,

  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  tickets$!: Observable<Ticket[]>;
  openTickets$!: Observable<any>;
  closedTickets$!: Observable<any>;

  constructor(private ticketService: TicketService, private router: Router) {

  }

  ngOnInit(): void {
    this.tickets$ = this.ticketService.getTickets();
    this.openTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(t => t.status === 'open')));
    this.closedTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(t => t.status === 'closed')));
  }


}
