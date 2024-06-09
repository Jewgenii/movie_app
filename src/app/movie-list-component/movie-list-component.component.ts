import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovieCardComponentComponent } from '../movie-cards/movie-card-component/movie-card-component.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list-component',
  standalone: true,
  imports: [CommonModule, MovieCardComponentComponent],
  templateUrl: './movie-list-component.component.html',
  styleUrl: './movie-list-component.component.scss'
})
export class MovieListComponentComponent {

  @Output() addToFavoriteEmitter = new EventEmitter<any>();
  @Output() addToWatchListEmitter = new EventEmitter<any>();

  @Input() name: string = "no name";
  @Input() movies: any[] = [];

  constructor() {
    console.log('constructor');
  }

  public handleFavorites(event: any): void {
    this.addToFavoriteEmitter.emit(event);
  }

  public handleWatchList(event: any): void {
    this.addToWatchListEmitter.emit(event);
  }

  public removeMovie(event: any): void {
    this.movies = this.movies.filter((movie) => movie.id !== event.id);
  }
}
