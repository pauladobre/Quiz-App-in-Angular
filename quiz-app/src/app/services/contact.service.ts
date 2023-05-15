import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class ContactForm {
    constructor(private http: HttpClient) { }

    userMessage(name: string, email: string, message: string) {
        const db = 'http://localhost:3000/contactForm';
        const id = uuidv4();
        return this.http.post(db, {id, name, email, message })
    }

}