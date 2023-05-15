import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookies.service';
import { DisplayScore } from 'src/app/services/display-score.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {
  scores: any[] = [];
  difficultyLevel: string = '';
  chosenCategory: string = '';
  score: string = '';

  constructor(
    private displayScore: DisplayScore,
    private cookieService: CookieService,
  ) { }

  ngOnInit(): void {
    const userId = this.cookieService.getCookie('email') || '';
    this.fetchScores(userId);
  }


  fetchScores(userId: string): void {
    this.displayScore.getScores(userId).subscribe(
      scores => {
        this.scores = scores.filter(score => score.userId === userId);
      },
      error => {
        console.error('Error fetching scores:', error);
      }
    );
  }
  
}
