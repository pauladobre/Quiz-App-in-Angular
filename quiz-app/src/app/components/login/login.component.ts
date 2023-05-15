import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email?: string;
  password?: string;
  errorMessage: string = '';
  name: string = '';

  constructor(private loginService: LoginService,
    private router: Router,
    private cookieService: CookieService,
  ) { }

  onLoginSubmit(event: Event): void {
    event.preventDefault();
    this.fetchInitialData();
  }

  ngOnInit(): void { }

  isInputFilled(): boolean {
    return this.email && this.password ? false : true;
  }
  
  fetchInitialData(): void {
    const email = this.email;
    const password = this.password;

    this.loginService.fetchInitialData().subscribe(
      (data: any[]) => {
        const user = data.find((user: any) => user.email === email && user.password === password);

        if (user) {
          console.log("Login successful");

          this.cookieService.setCookie('email', user.email, 7);
          this.cookieService.setCookie('loggedIn', 'true', 7);
          this.loginService.setLoggedIn(true);

          this.cookieService.setCookie('name', user.name, 7);

          this.router.navigate(['/home']);;
        } else {
          console.log("Login unsuccessful");
          this.errorMessage = "Incorrect email or password. Please try again.";
          this.email = '';
          this.password = '';
        }
      },
      error => {
        console.error("Error:", error);
      }
    );
  }
}