import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AccountDetails, TokenResponse, ValidateWithLogin } from '../../models/movie-service-models';
import { HttpOptions } from '../../models/http-options';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly _baseUrl: string = "https://api.themoviedb.org/3";

  constructor(private _httpClient: HttpClient
  ) {
  }

  public getToken(api_key: string): Observable<TokenResponse> {
    return this._httpClient.get<TokenResponse>(`${this._baseUrl}/authentication/token/new?api_key=${api_key}`);
  }


  public validateWithLogin(api_key: string, loginModel: ValidateWithLogin): Observable<any> {
    return this._httpClient.post<any>(`${this._baseUrl}/authentication/token/validate_with_login?api_key=${api_key}`, loginModel);
  }

  public postSession(api_key: string, request_token: string, options: HttpOptions): Observable<any> {
    return this._httpClient.post<any>(`${this._baseUrl}/authentication/session/new?api_key=${api_key}`,
      { "request_token": request_token },
      options);
  }

  public getAccountInfo(options: HttpOptions): Observable<AccountDetails> {
    return this._httpClient.get<AccountDetails>(`${this._baseUrl}/account/null`, options);
  }

  public getLists(accountId: string, options: HttpOptions): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/account/${accountId}/lists`, options);
  }

  public getFavorites(accountId: string, options: HttpOptions): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/account/${accountId}/favorite/movies`,
      options);
  }

  public getWatchList(accountId: string, options: HttpOptions): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/account/${accountId}/watchlist/movies`,
      options);
  }

  public getPopular(options: HttpOptions): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/movie/popular`, options);
  }

  public getUpcoming(options: HttpOptions): Observable<any> {
    return this._httpClient.get<any>(`${this._baseUrl}/movie/upcoming`,
      options);
  }

  public addToFavorite(id: string, options: HttpOptions): Observable<any> {
    return this._httpClient.post<any>(`${this._baseUrl}/movie/upcoming`,
      options);
  }
}
