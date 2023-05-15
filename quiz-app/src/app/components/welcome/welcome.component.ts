import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  userName: string = '';

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userName = this.cookieService.getCookie('name') || '';
  }
}
