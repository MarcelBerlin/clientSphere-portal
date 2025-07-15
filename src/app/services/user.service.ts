import { inject, Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc, setDoc, collection, collectionData } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: any;

  private fs = inject(Firestore)
  constructor(private firestore: Firestore, private router: Router) {
    this.userCollection = collection(this.firestore, 'users');
   }

  getProfile(uid: string) {
    const ref = doc(this.fs, `users/${uid}`);
    return getDoc(ref);
  }

  // updated auch adress & phone
  updateProfile(uid: string, data: Partial<{ address: string; phone: string }>) {
    const ref = doc(this.fs, `users/${uid}`);
    return setDoc(ref, data, { merge: true });
  }

  // Wird beim alleresten Login aufgerufen, um Doc anzulegen
  createProfileIfMissing(uid: string, email: string) {
    const ref = doc(this.fs, `users/${uid}`);
    return setDoc(ref, { email, createdAt: new Date() }, { merge: true });
  }

  getFurtherUserInfo(): Observable<any> {
    return collectionData(this.userCollection, { idField: 'id' });
  }
}
