import { Component } from '@angular/core';
import { ContactForm } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  name: string = '';
  email?: string;
  message?: string;

  constructor(private contactForm: ContactForm) { }
  
  isFormValid(): boolean {
    return !!this.name && !!this.email && !!this.message;
  }
  
  onSubmit(event: Event) {
    event.preventDefault();
    const name = this.name;
    const email = this.email || ''
    const message = this.message || '';

    this.contactForm.userMessage(name, email, message).subscribe(
      data => {
       console.log(message)
      },
      error => {
        console.error("Error:", error);
      }
    );
  }
}
