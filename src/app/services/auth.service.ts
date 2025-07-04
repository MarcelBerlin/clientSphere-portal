import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User, updateProfile } from '@angular/fire/auth';
import { user, authState } from "@angular/fire/auth";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  getUser(): Observable<User | null> {
    return authState(this.auth);
  }

  updateDisplayName(name: string) {
    const user = this.auth.currentUser;
    return user ? updateProfile(user, { displayName: name }) : Promise.reject('No user logged in');
  }
}
