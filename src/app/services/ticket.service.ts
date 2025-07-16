import { formatDate } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc, DocumentData, serverTimestamp, UpdateData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';


export interface Ticket {
  id?: string;
  title: string;
  description: string;
  userId: string;
  userEmail: string;
  status: 'open' | 'closed';
  createdAt: Timestamp;
  closedAt: Timestamp;
  closedBy: string;         
  supportMessage?: string;  
  closeMessage?: string | null;
}

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  ticketsCollection: any;


  constructor(private firestore: Firestore, private auth: Auth) {
    this.ticketsCollection = collection(this.firestore, 'tickets');
  }

  // Alle Tickets des aktuellen Users (hier vereinfacht)
  getTickets(): Observable<Ticket[]> {
    return collectionData(this.ticketsCollection, { idField: 'id' }) as Observable<Ticket[]>;
  }

  // Ticket erstellen
  createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'status' | 'userId'>) {

    const user = this.auth.currentUser;

    return addDoc(this.ticketsCollection, {
      ...data,
      status: 'open',
      createdAt: new Date(),
      userId: user?.uid || null,
      userEmail: user?.email || null
    });
  }

  // Ticket aktualisieren
  updateTicket(id: string, updates: Partial<Ticket>) {
    const docRef = doc(this.firestore, `tickets/${id}`);
    return updateDoc(docRef, updates as DocumentData);
  }

  closeTicket(ticketId: string, msg: string | null) {
    const user = inject(Auth).currentUser;
    const update: UpdateData<Ticket> = {
      status: 'closed',
      closedAt: serverTimestamp(),
      closedBy: user?.uid ?? 'system',
      supportMessage: msg ?? ''
    };
    return updateDoc(doc(this.firestore, 'tickets', ticketId), update);
  }

  // Ticket löschen
  deleteTicket(id: string) {
    const docRef = doc(this.firestore, `tickets/${id}`);
    return deleteDoc(docRef);
  }

}
