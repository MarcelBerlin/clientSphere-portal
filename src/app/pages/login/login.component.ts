import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error = '';
  loading = false;
  loginForm: FormGroup;


  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onLogin() {
    this.error = '';
    this.loading = true;
    try {
      const { email, password } = this.loginForm.value;
      await this.auth.login(email!, password!);
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      // e.code enthält z. B. 'auth/invalid-credential', 'auth/user-not-found', etc.
      switch (e.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          this.error = 'E-Mail oder Passwort ist falsch.';
          break;
        case 'auth/user-not-found':
          this.error = 'Kein Konto gefunden. Bitte registrieren.';
          break;
        case 'auth/too-many-requests':
          this.error = 'Zu viele Fehlversuche. Bitte später erneut versuchen.';
          break;
        default:
          this.error = 'Login fehlgeschlagen. Bitte versuche es erneut.';
      }
    }
    this.loading = false;
  }


  async onGuestLogin() {
    this.error = '';
    this.loading = true;
    try {
      await this.auth.guestLogin();
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error = 'Gäste Login fehlgeschlagen. Bitte versuchen Sie es erneut.';
    }
    this.loading = false;
  }
}