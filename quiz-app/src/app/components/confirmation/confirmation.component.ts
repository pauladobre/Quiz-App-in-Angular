import { Component } from '@angular/core';
import { CookieService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  userName: string = '';
  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.userName = this.cookieService.getCookie('name') || '';
  }
}
