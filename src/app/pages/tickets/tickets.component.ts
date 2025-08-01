import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { filter, map, Observable } from 'rxjs'
import { TicketService, Ticket } from '../../services/ticket.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Auth } from '@angular/fire/auth';
import { Title } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CloseTicketDialogComponent } from '../close-ticket-dialog/close-ticket-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-tickets',
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatSelectModule,
    MatExpansionModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatDialogModule
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit {

  disableSelect = new FormControl(false);
  tickets$!: Observable<Ticket[]>;
  newTicketForm: FormGroup;
  editForm: FormGroup;
  loading = false;
  error = '';
  currentUserId = '';
  editingTicketId: string | null = null;
  openTickets$!: Observable<any>;
  closedTickets$!: Observable<any>;


  constructor(
    private ticketService: TicketService,
    private fb: FormBuilder,
    private auth: Auth,
    private dialog: MatDialog,
  ) {
    this.newTicketForm = this.fb.group({
      area: ['', [Validators.required]],
      title: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });

    this.editForm = this.fb.group({
      area: [''],
      title: [''],
      description: ['']
    });
    this.currentUserId = this.auth.currentUser?.uid || '';
  }


  ngOnInit(): void {
    this.tickets$ = this.ticketService.getTickets();
    this.openTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(t => t.status === 'open')));
    this.closedTickets$ = this.tickets$.pipe(map(tickets => tickets.filter(t => t.status === 'closed')));
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

  onUpdate(id: string) {
    if (this.editForm.invalid) return;

    this.ticketService.updateTicket(id, this.editForm.value)
      .then(() => {
        this.editingTicketId = null;
      }).catch(err => {
        this.error = err.message;
      });
  }

  startEdit(ticket: Ticket) {
    this.editingTicketId = ticket.id!;
    this.editForm.patchValue({
      area: ticket.area,
      title: ticket.title,
      description: ticket.description
    });
  }

  cancelEdit() {
    this.editingTicketId = null;
  }

  deleteTicket(id: string) {
    return this.ticketService.deleteTicket(id);
  }

  openCloseDialog(ticket: Ticket) {
    const ref = this.dialog.open(CloseTicketDialogComponent, {
      width: '400px'
    });

    ref.afterClosed().subscribe(message => {
      if (message !== undefined) {
        this.ticketService.updateTicket(ticket.id!, {
          status: 'closed',
          closeMessage: message || null
        });
      }
    });
  }


}
