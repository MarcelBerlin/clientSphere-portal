import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, updateDoc, deleteDoc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Ticket {
  id?: string;
  title: string;
  description: string;
  status: 'open' | 'closed';
  createdAt: Date;
}

@Injectable({
  providedIn: 'root'
})

export class TicketService {

  ticketsCollection: any;


  constructor(private firestore: Firestore) {
    this.ticketsCollection = collection(this.firestore, 'tickets');
  }

  // Alle Tickets des aktuellen Users (hier vereinfacht)
  getTickets(): Observable<Ticket[]> {
    return collectionData(this.ticketsCollection, { idField: 'id'}) as Observable<Ticket[]>;
  }

  // Ticket erstellen
  createTicket(data: Omit<Ticket, 'id' | 'createdAt' | 'status'>) {
    return addDoc(this.ticketsCollection, {
      ...data,
      status: 'open',
      createdAt: new Date()
    });
  }

  // Ticket aktualisieren
  updateTicket(id: string, updates: Partial<Ticket>) {
    const docRef = doc(this.firestore, `tickets/${id}`);
    return updateDoc(docRef, updates as DocumentData);
  }

  // Ticket löschen
  deleteTicket(id: string) {
    const docRef = doc(this.firestore, `tickets/${id}`);
    return deleteDoc(docRef);
  }

}
