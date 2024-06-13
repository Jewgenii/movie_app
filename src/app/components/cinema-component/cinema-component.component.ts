import { Component, Input, OnInit, Output } from '@angular/core';
import { MovieListComponent } from '../movie-list-component/movie-list-component.component';
import { CommonModule } from '@angular/common';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MovieData, MOCK_MOVIES } from '../../mock-data/movie-data';

@Component({
  selector: 'app-cinema-component',
  standalone: true,
  imports: [MovieListComponent, CommonModule, LocalizeImagePathPipe],
  templateUrl: './cinema-component.component.html',
  styleUrl: './cinema-component.component.scss'
})
export class CinemaComponent implements OnInit {

  // private jsonURL: string = 'assets/data/mock-data.json';

  public castMovies: MovieData[] = [];
  public favoriteMovies: MovieData[] = [];
  public watchLaterMovies: MovieData[] = [];

  constructor() {
  }

  ngOnInit(): void {
    // 1. loadMovies from json file

    // this.http.get<any[]>(this.jsonURL).subscribe({
    //   next: data => {
    //     this.castMovies = data;
    //     this.addUiPropertiesToMovies(this.castMovies)
    //   },
    //   error: err => console.error('An error occurred :', err),
    //   complete: () => console.log('Fetching data completed...')
    // });

    // 2. loadMovies from mock data
    this.castMovies = MOCK_MOVIES;
  }

  public addMovieToFavorites(movie: any): void {
    var contains = this.favoriteMovies.includes(movie);
    if (!contains) {
      this.favoriteMovies.push(movie);
    }
  }

  public addMovieToWatchLater(movie: any): void {
    var contains = this.watchLaterMovies.includes(movie)
    if (contains!) {
      this.watchLaterMovies.push(movie);
    }
  }

  // private addUiPropertiesToMovies(movies: any[]): void {
  //   movies.forEach((movie) => {
  //     movie.wasAddedToFavorites = false;
  //     movie.wasAddedToWatchList = false;
  //   });
  // }
}
