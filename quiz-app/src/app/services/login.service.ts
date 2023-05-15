import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from './cookies.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isLoggedIn: boolean = false;
  private loggedInCookieName = 'loggedIn';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  fetchInitialData(): Observable<any[]> {
    const db = 'http://localhost:3000/users';
    return this.http.get<any[]>(db);
  }

  setLoggedIn(value: boolean): void {
    this.isLoggedIn = value;
    this.cookieService.setCookie(this.loggedInCookieName, String(value), 7);
  }

  getLoggedIn(): boolean {
    const loggedInCookie = this.cookieService.getCookie(this.loggedInCookieName);
    return loggedInCookie ? JSON.parse(loggedInCookie) : this.isLoggedIn;
  }


}
