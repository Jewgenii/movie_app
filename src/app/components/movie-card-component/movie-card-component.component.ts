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

  @Input() movieData!: MovieData;
  @Input() isAbleToAddToList: boolean = false;

  @Output() addFavoriteEmitter = new EventEmitter<MovieData>();
  @Output() addWatchLaterEmitter = new EventEmitter<MovieData>();

  @Output() removeFavoriteEmitter = new EventEmitter<number>();
  @Output() removeWatchLaterEmitter = new EventEmitter<number>();

  public isDetails: boolean = false;
  public rating: number = 0;
  public shortDescriptionLength: number = 10;

  public addToFavorites(): void {
    this.addFavoriteEmitter.emit({...this.movieData});
  }

  public addToWatchLater(): void {
    this.addWatchLaterEmitter.emit({...this.movieData});
  }

  public removeFromFavorites(): void {
    this.removeFavoriteEmitter.emit(this.movieData.id);
  }

  public removeFromWatchLater(): void {
    this.removeWatchLaterEmitter.emit(this.movieData.id);
  }

  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
