import { Injectable } from '@angular/core';
import { MovieService } from '../movie-services/movie.service';

import { firstValueFrom, map, Observable, switchMap } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials';
import { CredentialsManagerService } from '../credentials-service/credentials-manager.service';
import {
  FavoriteMedia,
  MovieDetails,
  MovieListData,
  MovieListWithDatesModel,
  MovieData,
} from '../../models/movie-list-model';
import {
  AccountDetails,
  CreateSessionResult,
  DeleteSessionResult,
  ResponseResult,
  ValidateWithLogin,
} from '../../models/movie-service-models';
import { MovieAuthService } from '../movie-services/auth-service/movie-auth.service';
import { DataMapper } from '../../mapper/mapper';

@Injectable({
  providedIn: 'root',
})
export class MovieManagerService {
  private userCredentials!: UserCredentials;

  constructor(
    private movieService: MovieService,
    private movieAuthService: MovieAuthService,
    private credentialsManager: CredentialsManagerService
  ) {
    this.userCredentials = this.credentialsManager.getUserCredentials();
  }

  public getNowPlaying(): Observable<MovieData[]> {
    return this.movieService
      .getNowPlaying<MovieListWithDatesModel>()
      .pipe(map((res) => res.results));
  }

  public getPopular(): Observable<MovieData[]> {
    return this.movieService
      .getPopular<MovieListData>()
      .pipe(map((e) => e.results));
  }

  public getTopRated(): Observable<MovieData[]> {
    return this.movieService
      .getTopRated<MovieListData>()
      .pipe(map((e) => e.results));
  }

  public getUpcoming(): Observable<MovieData[]> {
    return this.movieService
      .getUpcoming<MovieListWithDatesModel>()
      .pipe(map((e) => e.results));
  }

  public getMovieDetails(id: number): Observable<MovieData> {
    return this.movieService
      .getMovieDetails<MovieDetails>(id)
      .pipe(map(DataMapper.mapMovieDetailsToMovieData));
  }

  public getFavorites(): Observable<MovieData[]> {
    return this.getAccountDetails().pipe(
      switchMap((data) =>
        this.movieService
          .getFavorites<MovieListData>(data.id)
          .pipe(map((res) => res.results))
      )
    );
  }

  public getWatchList(): Observable<MovieData[]> {
    return this.getAccountDetails().pipe(
      switchMap((accountDetails) =>
        this.movieService
          .getWatchList<MovieListData>(accountDetails.id)
          .pipe(map((res) => res.results))
      )
    );
  }

  public getAccountDetails(): Observable<AccountDetails> {
    return this.movieService.getAccountInfo();
  }

  public removeSession(session_id: string): Observable<DeleteSessionResult> {
    return this.movieAuthService.deleteSession(session_id);
  }

  public authenticateAndGetSession(): Observable<CreateSessionResult> {
    return this.movieAuthService.getToken().pipe(
      switchMap((tokenRes) => {
        const login: ValidateWithLogin = {
          password: this.userCredentials.password,
          username: this.userCredentials.userName,
          request_token: tokenRes.request_token,
        };

        return this.movieAuthService
          .validateWithLogin(login)
          .pipe(
            switchMap(() =>
              this.movieAuthService.postSession(tokenRes.request_token)
            )
          );
      })
    );
  }

  public addToFavorite(media_id: number): Observable<ResponseResult> {
    return this.getAccountDetails().pipe(
      switchMap((accountDetails) =>
        this.movieService.addToFavorite<ResponseResult>(
          media_id,
          accountDetails.id
        )
      )
    );
  }

  public removeFromFavorite(media_id: number): Observable<ResponseResult> {
    return this.getAccountDetails().pipe(
      switchMap((accountDetails) =>
        this.movieService.removeFromFavorite<ResponseResult>(
          media_id,
          accountDetails.id
        )
      )
    );
  }

  public addToWatchList(media_id: number): Observable<ResponseResult> {
    return this.getAccountDetails().pipe(
      switchMap((accountDetails) =>
        this.movieService.addToWatchList<ResponseResult>(
          media_id,
          accountDetails.id
        )
      )
    );
  }

  public removeFromWatchList(media_id: number): Observable<ResponseResult> {
    return this.getAccountDetails().pipe(
      switchMap((accountDetails) =>
        this.movieService.removeFromWatchList<ResponseResult>(
          media_id,
          accountDetails.id
        )
      )
    );
  }
}
