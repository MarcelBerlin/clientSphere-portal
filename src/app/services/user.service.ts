import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private fs = inject(Firestore)
  constructor(private router: Router) { }

  getProfile(uid: string) {
    const ref = doc(this.fs, `users/${uid}`);
    return getDoc(ref);
  }


  // updated auch adress & phone
  updateProfile(uid: string, data: Partial<{ address: string; phone: string }>) {
    const ref = doc(this.fs, `users/${uid}`);
    return setDoc(ref, data, { merge: true }), this.router.navigate(['/dashboard']);
  }

  // Wird beim alleresten Login aufgerufen, um Doc anzulegen
  createProfileIfMissing(uid: string, email: string) {
    const ref = doc(this.fs, `users/${uid}`);
    return setDoc(ref, { email, createdAt: new Date() }, { merge: true }), this.router.navigate(['/dashboard']);
  }

}
