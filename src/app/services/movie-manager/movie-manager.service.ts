import { Injectable } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { HttpHeaders } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials';
import { CredentialsManagerService } from '../credentials-service/credentials-manager.service';
import { MovieDetails, MovieListModel, MovieListWithDatesModel, MovieModel } from '../../models/movie-list-model';


@Injectable({
  providedIn: 'root'
})
export class MovieManagerService {
  private _options: any;
  private _userCredentials!: UserCredentials;

  constructor(private _movieService: MovieService,
    private _credentialsManager: CredentialsManagerService
  ) {

    this._userCredentials = this._credentialsManager.getUserCredentials();

    this._options = {
      headers: new HttpHeaders({
        // "x-auth-interceptor": ``,
        "Authorization": `Bearer ${this._userCredentials.apiAuthToken}`
      })
    };
  }

  public async getPopular(): Promise<MovieModel[]> {
    let query = this._movieService.getPopular<MovieListModel>(this._options);
    const movieList = await firstValueFrom(query);

    return movieList.results;
  }


  public async getNowPlaying(): Promise<MovieModel[]> {
    let query = this._movieService.getNowPlaying<MovieListWithDatesModel>(this._options);
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
    let movie = await firstValueFrom(query);
    return movie as unknown as MovieModel;
  }



  tmp() {
    // this._movieService.getPopular().subscribe(res => {

    //   console.log(res)
    // });


    // let token = await this._movieService.getToken(this._api_key);

    // let loginModel: ValidateWithLogin = {
    //   "username": this._userName,
    //   "password": this._userPass,
    //   "request_token": token.request_token
    // }

    // let validResult = await this._movieService.validateWithLogin(this._api_key, loginModel);
    // let session = await this._movieService.postSession(this._api_key, token.request_token);
  }
}
