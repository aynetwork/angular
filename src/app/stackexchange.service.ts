import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Question} from './shared/question';
import {HttpClient, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StackexchangeService {
  // private localUrl = '/assets/resp.json';
  // private userUrl = '/assets/user.json';
  // private tagUrl = '/assets/tag.json';
  // private questionUrl = '/assets/question.json';
  // private answersUrl = '/assets/answers.json';


  private userUrl: string;
  private tagUrl: string;
  private questionUrl: string;
  private answersUrl: string;


  constructor(private http: HttpClient) { }

  getUserQuestions(id: number): Observable<HttpResponse<any>> {
    this.userUrl = `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&user=${id}&site=stackoverflow`;
    return this.http.get<any>(
      this.userUrl, { observe: 'response' });
  }
  getTagQuestions(tagName: string): Observable<HttpResponse<any>> {
    this.tagUrl = `https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=activity&tagged=${tagName}&site=stackoverflow`;
    return this.http.get<any>(
      this.tagUrl, { observe: 'response' });
  }
  getQuestions(searchString: string): Observable<HttpResponse<any>> {
    this.questionUrl = `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${searchString}&site=stackoverflow`;
    return this.http.get<any>(
      this.questionUrl, { observe: 'response' });
  }
  getAnswers(id: number): Observable<HttpResponse<any>> {
    this.answersUrl = `https://api.stackexchange.com/2.2/questions/${id}/answers?order=desc&sort=activity&site=stackoverflow`;
    return this.http.get<any>(
      this.answersUrl, { observe: 'response' });
  }
  getQuestion(id: number): Observable<HttpResponse<any>> {
    this.questionUrl = `https://api.stackexchange.com/2.2/questions/${id}?order=desc&sort=activity&site=stackoverflow`;
    return this.http.get<any>(
      this.questionUrl, { observe: 'response' });
  }
}
