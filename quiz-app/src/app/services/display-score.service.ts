import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisplayScore {
  constructor(private http: HttpClient) { }

  getScores(email: string): Observable<any[]> {
    const dbScores = `http://localhost:3000/scores?email=${email}`;
    return this.http.get<any[]>(dbScores);
  }
}
