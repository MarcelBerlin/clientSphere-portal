import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs'
import { TicketService, Ticket } from '../../services/ticket.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tickets',
  imports: [
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {

  tickets$!: Observable<Ticket[]>;
  newTicketForm: FormGroup;
  loading = false;
  error = '';

  constructor(private ticketService: TicketService, private fb: FormBuilder) {
    this.newTicketForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.tickets$ = this.ticketService.getTickets();
  }

  async onCreate() {
    if (this.newTicketForm.invalid) return;
    this.loading = true;
    try {
      await this.ticketService.createTicket(this.newTicketForm.value);
      this.newTicketForm.reset();
    } catch (e: any) {
      this.error = e.message;
    }
    this.loading = false;
  }
}
