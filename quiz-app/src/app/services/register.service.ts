import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})

export class RegistrationService {

    constructor(private http: HttpClient) { }

    registerUser(name: string  | undefined = '',  email: string, password: string) {
        const db = 'http://localhost:3000/users';
        const id = uuidv4();

        return this.http.post(db, { id, name, email, password });
    }
}
