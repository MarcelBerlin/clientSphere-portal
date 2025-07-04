import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  profileForm: any;
  loading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    //aktuelles Profil vorbelegen
    this.auth.getUser().subscribe(user => {
      this.profileForm.patchValue({ displayName: user?.displayName || '' });
    });
  }

  async onSave() {
    this.error = this.success = '';
    if (this.profileForm.invalid) return;
    this.loading = true;
    try {
      const { displayName } = this.profileForm.value;
      await this.auth.updateDisplayName(displayName);
      this.success = 'Profil erfolgreich aktualisiert!';
    } catch (e: any) {
      this.error = e.message || 'Update fehlgeschlagen';
    }
    this.loading = false;
  }



}
