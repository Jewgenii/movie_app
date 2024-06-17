import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MovieData } from '../../models/movieData';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ShortOverviewPipe } from '../../pipes/short-overview.pipe';
import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [
    CommonModule,
    LocalizeImagePathPipe, ShortOverviewPipe,
    CardModule, ButtonModule, ImageModule, RatingModule
  ],
  templateUrl: './movie-card-component.component.html',
  styleUrl: './movie-card-component.component.scss'
})
export class MovieCardComponent {

  @Output() addToFavoritesEmitter = new EventEmitter<MovieData>();
  @Output() addToWatchLaterEmitter = new EventEmitter<MovieData>();
  @Output() removeEmitter = new EventEmitter<number>();

  @Input() movieData!: MovieData;
  @Input() isMayBeAddedToList: boolean = false;

  public readonly wordsCount: number = 10;

  public isDetails: boolean = false;

  public addToFavorites(): void {
    this.addToFavoritesEmitter.emit({ ...this.movieData });
  }

  public addToWatchLater(): void {
    this.addToWatchLaterEmitter.emit({ ...this.movieData });
  }

  public removeFromFavorites(): void {
    this.removeEmitter.emit(this.movieData.id);
  }

  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
