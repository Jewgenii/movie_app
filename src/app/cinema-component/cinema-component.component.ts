import { Component, Input, OnInit, Output } from '@angular/core';
import { MovieListComponentComponent } from '../movie-list-component/movie-list-component.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cinema-component',
  standalone: true,
  imports: [MovieListComponentComponent, HttpClientModule, CommonModule],
  templateUrl: './cinema-component.component.html',
  styleUrl: './cinema-component.component.scss'
})
export class CinemaComponentComponent implements OnInit {

  private jsonURL: string = 'assets/data/mock-data.json';

  public castMovies: any = [];
  public favoriteMovies: any = [];
  public watchLaterMovies: any = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get<any[]>(this.jsonURL).subscribe(data => {

      data.forEach((movie) => {

        movie.poster_path = 'assets/images/' + movie.poster_path;
        movie.wasAddedToFavorites = false;
        movie.wasAddedToWatchList = false;
      });
      this.castMovies = data;
    });
  }

  public addMovieToFavorites($movieCard: any): void {
    if (!this.favoriteMovies.includes($movieCard)) {
      this.favoriteMovies.push($movieCard);
    }
  }

  public addMovieToWatchLater($movieCard: any): void {
    if (!this.watchLaterMovies.includes($movieCard)) {
      this.watchLaterMovies.push($movieCard);
    }
  }
}
