import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MovieData } from '../../Models/movieData';

@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [CommonModule, LocalizeImagePathPipe],
  templateUrl: './movie-card-component.component.html',
  styleUrl: './movie-card-component.component.scss'
})
export class MovieCardComponent {

  @Input() movieData: MovieData = {} as MovieData;
  @Input() isShowingButtons: boolean = false;

  @Output() addFavoriteEmitter = new EventEmitter<MovieData>();
  @Output() addWatchListEmitter = new EventEmitter<MovieData>();

  @Output() removeFavoriteEmitter = new EventEmitter<number>();
  @Output() removeWatchListEmitter = new EventEmitter<number>();

  public isDetails: boolean = false;

  public isAddedToFavorites: boolean = false;
  public isAddedToWatchList: boolean = false;

  public addToFavoritesList(): void {
    this.isAddedToFavorites = true;
    this.addFavoriteEmitter.emit(this.movieData);
  }

  public addToWatchList(): void {
    this.isAddedToWatchList = true;
    this.addWatchListEmitter.emit(this.movieData);
  }

  public removeFromFavoritesList(): void {
    this.removeFavoriteEmitter.emit(this.movieData.id);
  }

  public removeFromWatchList(): void {
    this.removeWatchListEmitter.emit(this.movieData.id);
  }

  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
