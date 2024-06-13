import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MovieData } from '../../mock-data/movie-data';

@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [CommonModule, LocalizeImagePathPipe],
  templateUrl: './movie-card-component.component.html',
  styleUrl: './movie-card-component.component.scss'
})
export class MovieCardComponent {

  @Input() movieData: MovieData = {} as MovieData;

  @Output() addFavoriteEmitter = new EventEmitter<MovieData>();
  @Output() addWatchListEmitter = new EventEmitter<MovieData>();

  public isDetails: boolean = false;

  public addToFavoritesList(): void {
    this.movieData.wasAddedToFavorites = true;
    this.addFavoriteEmitter.emit(this.movieData);
  }

  public addToWatchList(): void {
    this.movieData.wasAddedToWatchList = true;
    this.addWatchListEmitter.emit(this.movieData);
  }

  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
