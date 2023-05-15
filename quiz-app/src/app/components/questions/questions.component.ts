import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})

export class QuestionsComponent implements OnInit {
  currentQuestion = 1;
  totalQuestions = 10;
  correctAnswer: string = '';
  optionsList: string[] = [];
  score = 0;
  chosenCategory: string = '';
  question: string = '';
  isOptionSelected = false;
  difficultyLevel: string = '';

  constructor(private quizService: QuizService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const categoryId = params['categoryId'];
      this.difficultyLevel = params['difficultyLevel'];
      this.loadQuestion(categoryId, this.difficultyLevel);
    });
  }

  async loadQuestion(categoryId: string, difficultyLevel: string) {
    const data = await this.quizService.loadQuestion(categoryId, difficultyLevel);
    if (data) {

      this.correctAnswer = data.correctAnswer;
      this.optionsList = data.optionsList;
      this.question = data.question;
      this.chosenCategory = data.chosenCategory;

    } else {
      console.error('Failed to load question from the QuizService');
    }
  }

  checkAnswer(selectedOption: string) {
    const isCorrect = selectedOption.trim() === this.correctAnswer.trim();

    const optionsList = document.querySelectorAll('.quiz-options li');
    optionsList.forEach((option: Element) => {
      option.classList.add('disabled');
      const optionText = option.querySelector('span')?.textContent;
      if (optionText) {
        if (optionText.trim() === selectedOption.trim()) {
          option.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (optionText.trim() === this.correctAnswer.trim()) {
          option.classList.add('correct');
        }
      }
    });

    this.isOptionSelected = true;

    if (isCorrect) {
      this.score++;
    }

    return isCorrect;
  }

  async nextQuestion() {
    this.isOptionSelected = false;
    this.currentQuestion++;

    if (this.currentQuestion <= this.totalQuestions) {
      this.optionsList = [];
      const categoryId = this.route.snapshot.queryParamMap.get('categoryId') || '';
      const difficultyLevel = this.route.snapshot.queryParamMap.get('difficultyLevel') || '';
      await this.loadQuestion(categoryId, difficultyLevel);
      const optionsList = document.querySelectorAll('.quiz-options li');
      optionsList.forEach((option: Element) => {
        option.classList.remove('correct', 'incorrect', 'disabled');
      });
    } else {
      this.router.navigate(['/results'], {
        queryParams: {
          score: this.score,
          category: this.chosenCategory,
          difficulty: this.difficultyLevel
        }
      });
    }
  }
}
