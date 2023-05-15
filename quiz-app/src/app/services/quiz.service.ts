import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface QuizApiResponse {
    response_code: number;
    results: any[]; 
}

@Injectable({
    providedIn: 'root'
})

export class QuizService {
    private APIUrl = 'https://opentdb.com/api.php';
    private totalQuestions = 20;
    private currentQuestion = 0;

    constructor(private http: HttpClient) { }

    async getQuestions(categoryId: string, difficultyLevel: string): Promise<any[]> {
        const url = `${this.APIUrl}?amount=${this.totalQuestions}&category=${categoryId}&difficulty=${difficultyLevel}`;
        try {
            const result = await this.http.get<QuizApiResponse>(url).toPromise()!;
            if (result && result.response_code === 0 && result.results.length > 0) {
                return result.results;
            } else {
                console.error('Error fetching questions from API:', result);
                return [];
            }
        } catch (error) {
            console.error('Error fetching questions from API:', error);
            return [];
        }
    }

    //responsible for loading a single question from the API and returning an object with details about the question
    async loadQuestion(categoryId: string, difficultyLevel: string): Promise<any> {
        const questions = await this.getQuestions(categoryId, difficultyLevel);
        if (questions.length > 0) {

            const data = questions[this.currentQuestion];
            this.currentQuestion++;
          
            return {
                questionNumber: `${this.currentQuestion}/${this.totalQuestions}`,
                correctAnswer: data.correct_answer,
                optionsList: this.getRandomOptionsList(data.incorrect_answers, data.correct_answer),
                question: data.question,
                chosenCategory: data.category
            };
        } else {
            return null;
        }
    }

    private getRandomOptionsList(incorrectAnswers: string[], correctAnswer: string): string[] {
        const options = [...incorrectAnswers];
        options.splice(Math.floor(Math.random() * (incorrectAnswers.length + 1)), 0, correctAnswer);
        return options;
    }
}
