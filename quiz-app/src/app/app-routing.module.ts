import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { QuizSettingsComponent } from './components/quiz-settings/quiz-settings.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResultsComponent } from './components/results/results.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'settings', component: QuizSettingsComponent },
  { path: 'questions', component: QuestionsComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'scoreboard', component: ScoreboardComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'home', component: WelcomeComponent },
  {path:'confirmation', component:ConfirmationComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
