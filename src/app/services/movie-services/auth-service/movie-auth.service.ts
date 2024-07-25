import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CreateSessionResult,
  DeleteSessionResult,
  TokenResult,
  ValidateWithLogin,
  ValidateWithLoginResult,
} from '../../../models/movie-service-models';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieAuthService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) {}

  public getToken(): Observable<TokenResult> {
    return this.httpClient
      .get<TokenResult>(`${this.baseUrl}/authentication/token/new`)
      .pipe(catchError((err) => of('error', err)));
  }

  public validateWithLogin(
    loginModel: ValidateWithLogin
  ): Observable<ValidateWithLoginResult> {
    return this.httpClient
      .post<ValidateWithLoginResult>(
        `${this.baseUrl}/authentication/token/validate_with_login`,
        loginModel
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public postSession(request_token: string): Observable<CreateSessionResult> {
    return this.httpClient
      .post<CreateSessionResult>(`${this.baseUrl}/authentication/session/new`, {
        request_token: request_token,
      })
      .pipe(catchError((err) => of('error', err)));
  }

  public deleteSession(sessionId: string): Observable<DeleteSessionResult> {
    return this.httpClient
      .delete<DeleteSessionResult>(`${this.baseUrl}/authentication/session`, {
        body: {
          session_id: sessionId,
        },
      })
      .pipe(catchError((err) => of('error', err)));
  }
}
