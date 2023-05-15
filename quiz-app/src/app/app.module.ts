import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { QuizSettingsComponent } from './components/quiz-settings/quiz-settings.component';
import { ResultsComponent } from './components/results/results.component';
import { QuizService } from './services/quiz.service';
import { QuestionsComponent } from './components/questions/questions.component';
import { CookieService } from './services/cookies.service';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContactComponent } from './components/contact/contact.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ContactForm } from './services/contact.service';
import { LoginService } from './services/login.service';
import { RegistrationService } from './services/register.service';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { DisplayScore } from './services/display-score.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    WelcomeComponent,
    QuizSettingsComponent,
    QuestionsComponent,
    ResultsComponent,
    FooterComponent,
    NavbarComponent,
    ContactComponent,
    ScoreboardComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuizService,
    CookieService,
    ContactForm,
    LoginService,
    RegistrationService, 
    DisplayScore],
  bootstrap: [AppComponent]
})
export class AppModule { }
