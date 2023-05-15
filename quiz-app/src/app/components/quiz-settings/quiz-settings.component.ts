import { Component } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.css']
})
export class QuizSettingsComponent {
  categoryId = '9';
  difficultyLevel!: string;
  startButtonDisabled = true;

  constructor(private quizService: QuizService, private router: Router) { }

  toggleStartButton() {
    if (this.categoryId && this.difficultyLevel) {
      this.startButtonDisabled = false;
    } else {
      this.startButtonDisabled = true;
    }
  } 
  
  async startQuiz() {
    if (this.categoryId && this.difficultyLevel) {
      const questions = await this.quizService.getQuestions(this.categoryId, this.difficultyLevel);
      if (questions.length > 0) {
        this.router.navigate(['/questions'], {
          queryParams: {
            categoryId: this.categoryId,
            difficultyLevel: this.difficultyLevel
          }
        });
      } else {
        console.log('No questions available');
      }
    }
  }
}