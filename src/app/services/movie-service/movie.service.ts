import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AccountDetails, CreateSessionResult, TokenResult, ValidateWithLogin, ValidateWithLoginResult } from '../../models/movie-service-models';
import { HttpOptions } from '../../models/http-options';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _baseUrl: string = "https://api.themoviedb.org/3";

  constructor(private _httpClient: HttpClient) {

  }

  public getToken(): Observable<TokenResult> {
    return this._httpClient.get<TokenResult>(`${this._baseUrl}/authentication/token/new`);
  }


  public validateWithLogin(loginModel: ValidateWithLogin): Observable<ValidateWithLoginResult> {
    return this._httpClient.post<ValidateWithLoginResult>(`${this._baseUrl}/authentication/token/validate_with_login`, loginModel);
  }

  public postSession(request_token: string): Observable<CreateSessionResult> {
    return this._httpClient.post<CreateSessionResult>(`${this._baseUrl}/authentication/session/new`,
      { "request_token": request_token });
  }

  public getAccountInfo(): Observable<AccountDetails> {
    return this._httpClient.get<AccountDetails>(`${this._baseUrl}/account/null`)
      .pipe();
  }

  public getLists(accountId: string): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/account/${accountId}/lists`);
  }

  public addToFavorite(id: string): Observable<any> {
    return this._httpClient.post<any>(`${this._baseUrl}/movie/upcoming`, {});
  }

  public getWatchList<Type>(accountId: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/account/${accountId}/watchlist/movies`);
  }

  public getNowPlaying<Type>(): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/now_playing`);
  }

  public getPopular<Type>(): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/popular`);
  }

  public getTopRated<Type>(): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/top_rated`);
  }

  public getUpcoming<Type>(): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/upcoming`);
  }

  public getMovieDetails<Type>(id: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/movie/${id}`);
  }

  public getFavorites<Type>(accountId: number): Observable<Type> {
    return this._httpClient.get<Type>(`${this._baseUrl}/account/${accountId}/favorite/movies`);
  }
}
