import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardComponent } from '../movie-card-component/movie-card-component.component';
import { CommonModule } from '@angular/common';
import { MovieData } from '../../mock-data/movie-data';

@Component({
  selector: 'app-movie-list-component',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './movie-list-component.component.html',
  styleUrl: './movie-list-component.component.scss'
})
export class MovieListComponent {

  @Output() addToFavoriteEmitter = new EventEmitter<MovieData>();
  @Output() addToWatchListEmitter = new EventEmitter<MovieData>();

  @Input() name: string = "no name";
  @Input() movies: MovieData[] = [];

  public handleFavorites(event: MovieData): void {
    this.addToFavoriteEmitter.emit(event);
  }

  public handleWatchList(event: MovieData): void {
    this.addToWatchListEmitter.emit(event);
  }

  public removeMovie(event: MovieData): void {
    this.movies = this.movies.filter((movie) => movie.id !== event.id);
  }

  public ngForTrackByIndex(index: number, movie: MovieData): number {
    return index;
  }
}
