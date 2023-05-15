import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ScoreService } from 'src/app/services/score.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {
  score!: number;
  chosenCategory!: string;
  difficultyLevel!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private scoreService: ScoreService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.score = params['score'];
      this.chosenCategory = params['category'];
      this.difficultyLevel = params['difficulty'];
    });

    this.saveQuizResults();
  }

  saveQuizResults(): void {
    this.scoreService.saveQuizResults(this.score, this.chosenCategory, this.difficultyLevel)
      .subscribe(
        () => {
          console.log('Quiz results saved successfully');
        },
        (error) => {
          console.error('Error saving quiz results:', error);
        }
      );
  }

  playAgain(): void {
    
    this.router.navigate(['/settings']);
  }
}
