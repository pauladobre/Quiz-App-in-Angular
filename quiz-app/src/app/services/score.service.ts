import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from './cookies.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScoreService {
    constructor(private http: HttpClient, private cookieService: CookieService) { }

    saveQuizResults(score: number, chosenCategory: string, difficultyLevel: string): Observable<any> {
        const userId = this.cookieService.getCookie('email');
        const quizResults = { userId, score, chosenCategory, difficultyLevel };
        const dbScores = 'http://localhost:3000/scores';

        return this.http.post(dbScores, quizResults);
    }
}
