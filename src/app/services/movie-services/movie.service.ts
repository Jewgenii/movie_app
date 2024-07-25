import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountDetails } from '../../models/movie-service-models';
import { FavoriteMedia, WatchListMedia } from '../../models/movie-list-model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly baseUrl: string = 'https://api.themoviedb.org/3';

  constructor(private httpClient: HttpClient) {}

  // account

  public getAccountInfo(): Observable<AccountDetails> {
    return this.httpClient
      .get<AccountDetails>(`${this.baseUrl}/account/null`)
      .pipe(catchError((err) => of('error', err)));
  }

  public getLists(accountId: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/account/${accountId}/lists`)
      .pipe(catchError((err) => of('error', err)));
  }

  public getWatchList<Type>(accountId: number): Observable<Type> {
    return this.httpClient
      .get<Type>(`${this.baseUrl}/account/${accountId}/watchlist/movies`)
      .pipe(catchError((err) => of('error', err)));
  }

  public getFavorites<Type>(accountId: number): Observable<Type> {
    return this.httpClient
      .get<Type>(`${this.baseUrl}/account/${accountId}/favorite/movies`)
      .pipe(catchError((err) => of('error', err)));
  }

  // movie

  public getMovieDetails<Type>(id: number): Observable<Type> {
    return this.httpClient
      .get<Type>(`${this.baseUrl}/movie/${id}`)
      .pipe(catchError((err) => of('error', err)));
  }

  //Movie Lists

  public getNowPlaying<Type>(
    page: number = 1,
    lang: string = 'en-US'
  ): Observable<Type> {
    return this.httpClient
      .get<Type>(
        `${this.baseUrl}/movie/now_playing?page=${page}&language=${lang}`
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public getPopular<Type>(
    page: number = 1,
    lang: string = 'en-US'
  ): Observable<Type> {
    return this.httpClient
      .get<Type>(`${this.baseUrl}/movie/popular?page=${page}&language=${lang}`)
      .pipe(catchError((err) => of('error', err)));
  }

  public getTopRated<Type>(
    page: number = 1,
    lang: string = 'en-US'
  ): Observable<Type> {
    return this.httpClient
      .get<Type>(
        `${this.baseUrl}/movie/top_rated?page=${page}&language=${lang}`
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public getUpcoming<Type>(
    page: number = 1,
    lang: string = 'en-US'
  ): Observable<Type> {
    return this.httpClient
      .get<Type>(`${this.baseUrl}/movie/upcoming?page=${page}&language=${lang}`)
      .pipe(catchError((err) => of('error', err)));
  }

  public addToFavorite<Type>(
    mediaId: number,
    account_id: number
  ): Observable<Type> {
    const media: FavoriteMedia = {
      favorite: true,
      media_type: 'movie',
      media_id: mediaId,
    };

    return this.httpClient
      .post<FavoriteMedia>(
        `${this.baseUrl}/account/${account_id}/favorite`,
        media
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public removeFromFavorite<Type>(
    mediaId: number,
    account_id: number
  ): Observable<Type> {
    const media: FavoriteMedia = {
      favorite: false,
      media_type: 'movie',
      media_id: mediaId,
    };

    return this.httpClient
      .post<FavoriteMedia>(
        `${this.baseUrl}/account/${account_id}/favorite`,
        media
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public addToWatchList<Type>(
    mediaId: number,
    account_id: number
  ): Observable<Type> {
    const media: WatchListMedia = {
      watchlist: true,
      media_type: 'movie',
      media_id: mediaId,
    };

    return this.httpClient
      .post<FavoriteMedia>(
        `${this.baseUrl}/account/${account_id}/watchlist`,
        media
      )
      .pipe(catchError((err) => of('error', err)));
  }

  public removeFromWatchList<Type>(
    mediaId: number,
    account_id: number
  ): Observable<Type> {
    const media: WatchListMedia = {
      watchlist: false,
      media_type: 'movie',
      media_id: mediaId,
    };

    return this.httpClient
      .post<FavoriteMedia>(
        `${this.baseUrl}/account/${account_id}/watchlist`,
        media
      )
      .pipe(catchError((err) => of('error', err)));
  }
}
