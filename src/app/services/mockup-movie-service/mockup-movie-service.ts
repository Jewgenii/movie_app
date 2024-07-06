import { Injectable } from '@angular/core';
import { MovieModel } from '../../models/movie-model';
import { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } from '../../mock-data/mock-data';
import { MovieInterface } from '../../interfaces/movie-interface';

@Injectable({
  providedIn: 'root'
})
export class MockupMovieService {

  private readonly _allMovies!: Array<MovieInterface>;
  private _favorites!: Array<MovieInterface>;
  private _watchLater!: Array<MovieInterface>;

  constructor() {
    this._allMovies = popularMovies.concat(nowPlayingMovies).concat(topRatedMovies).concat(upcomingMovies);
    this._favorites = new Array<MovieInterface>();
    this._watchLater = new Array<MovieInterface>();
  }

  public getWatchLater(): Array<MovieInterface> {
    return this._watchLater;
  }

  public getFavorites(): Array<MovieInterface> {
    return this._favorites;
  }

  public getMovieById(id: number): MovieInterface | null {
    for (let movie of this._allMovies) {
      if (movie.id === id) {
        return movie;
      }
    }
    return null;
  }

  public addToFavorite(movie: MovieInterface): boolean {
    if (!this._favorites.some(m => m.id == movie.id)) {
      this._favorites.push(movie);
      return true;
    }

    return false;
  }

  public removeFromFavorite(id: number): boolean {
    this._favorites = this._favorites.filter(e => e.id != id);
    return true;
  }

  public addToWatchLater(movie: MovieInterface): boolean {
    if (!this._watchLater.some(m => m.id == movie.id)) {
      this._watchLater.push(movie);
      return true;
    }

    return false;
  }

  public removeFromWatchLater(id: number): boolean {
    this._watchLater = this._watchLater.filter(e => e.id != id);
    return true;
  }

  public getPopular(): Array<MovieInterface> {
    return popularMovies as Array<MovieModel>;
  }

  public getNowPlaying(): Array<MovieInterface> {
    return nowPlayingMovies as Array<MovieModel>;
  }

  public getTopRated(): Array<MovieInterface> {
    return topRatedMovies as Array<MovieModel>;
  }

  public getUpcoming(): Array<MovieInterface> {
    return upcomingMovies as Array<MovieModel>;
  }
}
