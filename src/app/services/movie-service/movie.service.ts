import { Injectable } from '@angular/core';
import { MovieModel } from '../../models/movieModel';
import { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } from '../../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  private _favorites!: Array<MovieModel>;
  private _watchLater!: Array<MovieModel>;

  public getPopular(): Array<MovieModel> {
    return popularMovies as Array<MovieModel>;
  }

  public getNowPlaying(): Array<MovieModel> {
    return nowPlayingMovies as Array<MovieModel>;
  }

  public getTopRated(): Array<MovieModel> {
    return topRatedMovies as Array<MovieModel>;
  }

  public getUpcoming(): Array<MovieModel> {
    return upcomingMovies as Array<MovieModel>;
  }

  public getWatchLater(): Array<MovieModel> {
    return this._watchLater;
  }

  public getFavorites(): Array<MovieModel> {
    return this._watchLater;
  }

  public getMovieById(id: number): MovieModel | null {
    let allMovies = popularMovies.concat(nowPlayingMovies).concat(topRatedMovies).concat(upcomingMovies);

    for (let obj of allMovies) {
      if (obj.id === id) {
        return (obj as MovieModel);
      }
    }

    return null;
  }

  public setToFavorite(movie: MovieModel) {
    if (!this._favorites.some(m => m.id == movie.id)) {
      this._favorites.push(movie);
    }
  }

  public setToWatchLater(movie: MovieModel) {
    if (!this._watchLater.some(m => m.id == movie.id)) {
      this._watchLater.push(movie);
    }
  }

  public removeFromFavorite(id: number) {
    const index = this._favorites.findIndex(movie => movie.id === id);

    if (index !== -1) {
      this._favorites.splice(index, 1);
    }
  }

  public removeFromWatchLater(id: number) {
    const index = this._watchLater.findIndex(movie => movie.id === id);

    if (index !== -1) {
      this._watchLater.splice(index, 1);
    }
  }
}
