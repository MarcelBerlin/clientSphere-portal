
import { provideFirebaseApp, initializeApp } from "@angular/fire/app";
import { provideAuth, getAuth } from '@angular/fire/auth';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule, MatNavList } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { routes } from './app.routes';
import { environment } from "../environments/environment";
import { ReactiveFormsModule } from "@angular/forms";
import { provideFirestore } from "@angular/fire/firestore";
import { getFirestore } from "firebase/firestore";
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion'

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormField,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatSnackBarModule,
    MatSnackBar,
    MatExpansionModule,
    MatNavList,
    ReactiveFormsModule
  ]
};
