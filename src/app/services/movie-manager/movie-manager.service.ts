import { Injectable } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { HttpHeaders } from '@angular/common/http';

import { firstValueFrom, map } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials';
import { CredentialsManagerService } from '../credentials-service/credentials-manager.service';
import { MovieDetails, MovieListModel, MovieListWithDatesModel, MovieModel } from '../../models/movie-list-model';
import { AccountDetails, CreateSessionResult, TokenResult, ValidateWithLogin, ValidateWithLoginResult } from '../../models/movie-service-models';
import { UnaryOperator } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class MovieManagerService {
  private _options: any;
  private _userCredentials!: UserCredentials;

  private _currentSessionId: string = "";

  constructor(private _movieService: MovieService,
    private _credentialsManager: CredentialsManagerService
  ) {

    this._userCredentials = this._credentialsManager.getUserCredentials();

    this._options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this._userCredentials.apiAuthToken}`
      })
    };
  }


  public async getNowPlaying(): Promise<MovieModel[]> {
    let query = this._movieService.getNowPlaying<MovieListWithDatesModel>(this._options);
    const movieList = await firstValueFrom(query);

    return movieList.results;
  }

  public async getPopular(): Promise<MovieModel[]> {
    let query = this._movieService.getPopular<MovieListModel>(this._options);
    const movieList = await firstValueFrom(query);

    return movieList.results;
  }

  public async getTopRated(): Promise<MovieModel[]> {
    let query = this._movieService.getTopRated<MovieListModel>(this._options);
    const movieList = await firstValueFrom(query);

    return movieList.results;
  }

  public async getUpcoming(): Promise<MovieModel[]> {
    let query = this._movieService.getUpcoming<MovieListWithDatesModel>(this._options);
    const movieList = await firstValueFrom(query);

    return movieList.results;
  }

  public async getMovieDetails(id: number): Promise<MovieModel> {
    let query = this._movieService.getMovieDetails<MovieDetails>(id, this._options);
    let movies = await firstValueFrom(query.pipe(map(res => {
      return res as unknown as MovieModel;
    })));

    return movies;
  }

  public async getFavorites(): Promise<MovieModel[]> {
    let accountDetails = await this.getAccountDetails();

    let query = this._movieService.getFavorites<MovieListModel>(accountDetails.id, this._options);
    let movie = await firstValueFrom(query);
    return movie.results;
  }


  public async getWatchList(): Promise<MovieModel[]> {
    let accountDetails = await this.getAccountDetails();

    let query = this._movieService.getWatchList<MovieListModel>(accountDetails.id, this._options);
    let movie = await firstValueFrom(query);
    return movie.results;
  }


  private async getAccountDetails(): Promise<AccountDetails> {
    const res: AccountDetails = await firstValueFrom(this._movieService.getAccountInfo(this._options));
    return res;
  }

  public async startSession(): Promise<void> {

    const tokenResult: TokenResult = await firstValueFrom(this._movieService.getToken(this._options));

    const login: ValidateWithLogin = {
      password: this._userCredentials.password,
      username: this._userCredentials.userName,
      request_token: tokenResult.request_token
    };

    const validResult: ValidateWithLoginResult = await firstValueFrom(this._movieService.validateWithLogin(login, this._options));

    if (!validResult.success)
      throw new Error(validResult.status_message);

    const session = await firstValueFrom(this._movieService.postSession(tokenResult.request_token, this._options));
    this._currentSessionId = session.session_id;
  }
}
