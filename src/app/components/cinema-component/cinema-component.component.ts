import { Component, Input, OnInit, Output } from '@angular/core';
import { MovieListComponent } from '../movie-list-component/movie-list-component.component';
import { CommonModule } from '@angular/common';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MOCK_MOVIES } from '../../mock-data/movie-data';
import { MovieData } from '../../Models/movieData';
import { MovieListData } from '../../Models/movieListData';

@Component({
  selector: 'app-cinema-component',
  standalone: true,
  imports: [MovieListComponent, CommonModule, LocalizeImagePathPipe],
  templateUrl: './cinema-component.component.html',
  styleUrl: './cinema-component.component.scss'
})
export class CinemaComponent implements OnInit {

  // private jsonURL: string = 'assets/data/mock-data.json';
  public movieLists: MovieListData[] = [];

  public isNoMovies: boolean = false;

  ngOnInit(): void {

     let initialData: MovieData[] = MOCK_MOVIES;
    //  initialData = [];

    this.isNoMovies = initialData.length == 0;
    if (this.isNoMovies)
      return;

    this.movieLists.push({ name: 'Cast', movies: initialData });
    this.movieLists.push({ name: 'Favorites', movies: [] });
    this.movieLists.push({ name: 'Watch later', movies: [] });
  }

  public addMovieToFavorites(movie: MovieData): void {

    let lst = this.findListByName('Favorites');
    if (lst !== undefined)
      this.addToListIfNotContains(lst.movies, movie);
  }

  public addMovieToWatchLater(movie: MovieData): void {
    let lst = this.findListByName('Watch later');
    if (lst !== undefined)
      this.addToListIfNotContains(lst.movies, movie);
  }

  private findListByName(name: string): MovieListData | undefined {
    for (let i = 0; i < this.movieLists.length; i++) {
      if (this.movieLists[i].name === name) {
        return this.movieLists[i];
      }
    }
    return undefined;
  }

  private addToListIfNotContains(list: MovieData[], movie: MovieData): void {
    var contains = list.includes(movie)
    if (!contains) {
      list.push(movie);
    }
  }
}
