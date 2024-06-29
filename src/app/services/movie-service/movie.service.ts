import { Injectable } from '@angular/core';
import { MovieModel } from '../../models/movieModel';
import { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } from '../../mock-data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() {
    // this._favorites = new Array<MovieModel>();
    // this._watchLater = new Array<MovieModel>();
    console.log("MovieService ctor");
  }

  private _favorites: Array<MovieModel> = new Array<MovieModel>();
  private _watchLater: Array<MovieModel> = new Array<MovieModel>();

  public getWatchLater(): Array<MovieModel> {
    return this._watchLater;
  }

  public getFavorites(): Array<MovieModel> {
    return this._favorites;
  }

  public getMovieById(id: number): MovieModel {
    let allMovies = popularMovies.concat(nowPlayingMovies).concat(topRatedMovies).concat(upcomingMovies);

    for (let obj of allMovies) {
      if (obj.id === id) {
        return (obj as MovieModel);
      }
    }

    throw Error('movie data not found');
  }

  public addToFavorite(movie: MovieModel): boolean {
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

  public addToWatchLater(movie: MovieModel): boolean {
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
}
