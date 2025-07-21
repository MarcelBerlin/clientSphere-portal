import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { Auth } from '@angular/fire/auth';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { Observable, Observer } from 'rxjs';

export interface UserProfile {
  address?: string;
  phone?: string
}

@Component({
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatExpansionModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  users$!: Observable<any>;
  profileForm: any;
  editPrivate: any;
  loading = false;
  uid!: string;
  error = '';
  success = '';
  guestProfile: boolean = false;
  currentUser$;


  constructor (
    private fb: FormBuilder,
    private authService: AuthService,
    private auth: Auth,
    private userService: UserService,
    private router: Router,
    private snack: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required]
    });
    this.editPrivate = this.fb.group({
      address: [''],
      phone: ['']
    });
    this.currentUser$ = this.auth.currentUser;
  }

  ngOnInit(): void {
    //aktuelles Profil vorbelegen
    this.authService.getUser().subscribe(user => {
      this.profileForm.patchValue({ displayName: user?.displayName || '' });
    });
    this.uid = this.auth.currentUser?.uid ?? '';
    this.users$ = this.userService.getFurtherUserInfo();
    this.disabledOnGuestLogin();
        
  }

  async onSave() {
    this.error = this.success = '';
    if (this.profileForm.invalid) return;
    this.loading = true;
    try {
      const { displayName } = this.profileForm.value;
      await this.authService.updateDisplayName(displayName);
      this.success = 'Profil erfolgreich aktualisiert!';
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error = e.message || 'Update fehlgeschlagen';
    }
    this.loading = false;
  }

  startPrivateEdit() {
    this.userService.getProfile(this.uid).then(snap => {
      const data = snap.data() as UserProfile | undefined;
      this.editPrivate.patchValue({
        address: data?.address || '',
        phone: data?.phone || ''
      });
    });
  }

  savePrivate() {
    this.userService.updateProfile(this.uid, this.editPrivate.value)
      .then(() => this.snack.open('Gespeichert!', 'Ok', { duration: 2000 }));
  }

  disabledOnGuestLogin() {
    if (this.authService.unknownUser !== true) {
      this.guestProfile = true;
    } else {
      return;
    }
  }

}
