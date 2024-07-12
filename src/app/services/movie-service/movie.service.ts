import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, of } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AccountDetails, CreateSessionResult, DeleteSessionResult, TokenResult, ValidateWithLogin, ValidateWithLoginResult } from '../../models/movie-service-models';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _baseUrl: string = "https://api.themoviedb.org/3";

  constructor(private _httpClient: HttpClient) {

  }

  //authentication

  public getToken(): Observable<TokenResult> {
    return this._httpClient.get<TokenResult>(`${this._baseUrl}/authentication/token/new`)
      .pipe(catchError(err => of('error', err)));
  }

  public validateWithLogin(loginModel: ValidateWithLogin): Observable<ValidateWithLoginResult> {
    return this._httpClient.post<ValidateWithLoginResult>(`${this._baseUrl}/authentication/token/validate_with_login`, loginModel)
      .pipe(catchError(err => of('error', err)));
  }

  public postSession(request_token: string): Observable<CreateSessionResult> {
    return this._httpClient.post<CreateSessionResult>(`${this._baseUrl}/authentication/session/new`,
      { "request_token": request_token }).pipe(catchError(err => of('error', err)));
  }

  public deleteSession(sessionId: string): Observable<DeleteSessionResult> {
    return this._httpClient.delete<DeleteSessionResult>(`${this._baseUrl}/authentication/session`, {
      body: {
        session_id: sessionId
      }
    }).pipe(catchError(err => of('error', err)));
  }

  // account

  public getAccountInfo(): Observable<AccountDetails> {
    return this._httpClient.get<AccountDetails>(`${this._baseUrl}/account/null`)
      .pipe(catchError(err => of('error', err)));
  }

  public getLists(accountId: string): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/account/${accountId}/lists`)
      .pipe(catchError(err => of('error', err)));
  }

  public getWatchList<Type>(accountId: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/account/${accountId}/watchlist/movies`)
      .pipe(catchError(err => of('error', err)));
  }

  public getFavorites<Type>(accountId: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/account/${accountId}/favorite/movies`)
      .pipe(catchError(err => of('error', err)));
  }

  // movie

  public getMovieDetails<Type>(id: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/${id}`)
      .pipe(catchError(err => of('error', err)));
  }

  //Movie Lists

  public getNowPlaying<Type>(page: number = 1, lang: string = 'en-US'): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/now_playing?page=${page}&language=${lang}`)
      .pipe(catchError(err => of('error', err)));
  }

  public getPopular<Type>(page: number = 1, lang: string = 'en-US'): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/popular?page=${page}&language=${lang}`)
      .pipe(catchError(err => of('error', err)));
  }

  public getTopRated<Type>(page: number = 1, lang: string = 'en-US'): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/top_rated?page=${page}&language=${lang}`)
      .pipe(catchError(err => of('error', err)));
  }

  public getUpcoming<Type>(page: number = 1, lang: string = 'en-US'): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/upcoming?page=${page}&language=${lang}`)
      .pipe(catchError(err => of('error', err)));
  }

  ///


  public addToFavorite(id: string): Observable<any> {
    return this._httpClient.post<any>(`${this._baseUrl}/movie/upcoming`, {})
      .pipe(catchError(err => of('error', err)));
  }
}
