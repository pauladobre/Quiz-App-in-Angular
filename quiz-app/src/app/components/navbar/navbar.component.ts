import { Component } from '@angular/core';
import { CookieService } from 'src/app/services/cookies.service';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public loginService: LoginService, private cookieService: CookieService, private router: Router) { }

  logout(): void {
    this.loginService.setLoggedIn(false);
    this.cookieService.deleteCookie('email');
    this.cookieService.deleteCookie('loggedIn');

  }
}
