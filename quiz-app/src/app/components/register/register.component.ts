import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'src/app/services/cookies.service';
import { RegistrationService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: string = '';
  email?: string;
  password?: string;
  passwordConfirm?: string;
  errorMessage: string = '';

  constructor(
    private registrationService: RegistrationService, 
    private router: Router, 
    private cookieService: CookieService, 
    ) { }

  ngOnInit(): void { }

  isInputFilled(): boolean {
    return this.email && this.password && this.passwordConfirm ? false : true;
  }

  onRegisterSubmit(event: Event): void {
    event.preventDefault();
    const name = this.name;
    const email = this.email;
    const password = this.password ?? '';
    const passwordConfirm = this.passwordConfirm ?? '';

    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{8,}$/;

    if (!password.match(regex)) {
      this.errorMessage = "Invalid password format. Password must be between 8 and 12 characters long, <br> contain at least one letter, one number, and one special character (-#$.%&@!+=\\*).";
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      return;
    }

    if (password !== passwordConfirm) {
      this.errorMessage = "Passwords do not match.";
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      return;
    }

    if (!email) {
      this.errorMessage = "Please provide an email.";
      this.email = '';
      this.password = '';
      this.passwordConfirm = '';
      return;
    }

    this.registrationService.registerUser(name,email, password).subscribe(
      data => {
        console.log(data);
        this.cookieService.setCookie('email', email, 7)
        this.cookieService.setCookie('loggedIn', 'true', 7);
     
        this.cookieService.setCookie('name', name, 7);
        this.router.navigate(['/home']);
      },
      error => {
        console.error("Error:", error);
      }
    );
   

  }
}
