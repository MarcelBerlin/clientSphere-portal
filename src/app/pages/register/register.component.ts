import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error = '';
  loading = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private auth: Auth ,private userService: UserService, private router: Router) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }


  passwordMatchValidator(form: AbstractControl) {
    const password = form.get('password')?.value;
    const passwordRepeat = form.get('passwordRepeat')?.value;
    return password && passwordRepeat && password === passwordRepeat ? null : { mismatch: true };
  }

  async onRegister() {
    this.error = '';
    this.loading = true;

    const { email, password, passwordRepeat } = this.registerForm.value;
    if (password !== passwordRepeat) {
      this.error = 'Passwort nicht übereinstimmend!';
      this.loading = false;
      return;
    }
    try {
      await this.authService.register(email!, password!);
      this.userService.createProfileIfMissing(this.auth.currentUser!.uid, email);
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          this.error = 'Diese E-Mail wird bereits verwendet.';
          break;
        case 'auth/invalid-email':
          this.error = 'Bitte gib eine gültige E-Mail-Adresse ein.';
          break;
        case 'auth/weak-password':
          this.error = 'Das Passwort ist zu kurz (mindestens 6 Zeichen).';
          break;
        case 'auth/operation-not-allowed':
          this.error = 'Registrierung momentan nicht verfügbar.';
          break;
        case 'auth/too-many-requests':
          this.error = 'Zu viele Versuche. Bitte warte kurz und versuche es erneut.';
          break;
        case 'auth/network-request-failed':
          this.error = 'Netzwerkfehler. Bitte prüfe deine Internetverbindung.';
          break;
        case 'auth/quota-exceeded':
          this.error = 'Registrierung momentan nicht möglich, bitte später erneut versuchen.';
          break;
        default:
          this.error = 'Ein unbekannter Fehler ist aufgetreten. Bitte erneut versuchen.';
      }
    }

    this.loading = false;
  }


}
