import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-close-ticket-dialog',
  standalone: true,
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './close-ticket-dialog.component.html',
  styleUrl: './close-ticket-dialog.component.scss'
})
export class CloseTicketDialogComponent {

form = new FormGroup({
    message: new FormControl<string | null>(null)
  });


constructor(public dialogRef: MatDialogRef<CloseTicketDialogComponent>, private ticketService: TicketService) {}


// Optional
save() {
  if (this.form.invalid) return;
  this.dialogRef.close(this.form.value.message || null);
}




}
