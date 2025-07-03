import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  error = '';
  loading = false;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
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
      await this.auth.register(email!, password!);
      this.router.navigate(['/dashboard']);
    } catch (e: any) {
      this.error = e.message || 'Registrierung fehlgeschlagen';
    }
    this.loading = false;
  }


}
