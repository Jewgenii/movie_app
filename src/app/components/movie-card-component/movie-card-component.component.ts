import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MovieModel } from '../../models/movieModel';
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

  @Output() addToFavoritesEmitter = new EventEmitter<MovieModel>();
  @Output() addToWatchLaterEmitter = new EventEmitter<MovieModel>();

  @Output() removeFromListEmitter = new EventEmitter<number>();

  @Input() movieData!: MovieModel;
  @Input() isRemovable: boolean = false;

  public readonly wordsCount: number = 10
  public isDetails: boolean = false;

  public addToFavorites(): void {
    this.addToFavoritesEmitter.emit({ ...this.movieData });
  }

  public addToWatchLater(): void {
    this.addToWatchLaterEmitter.emit({ ...this.movieData });
  }

  public removeFromList(): void {
    this.removeFromListEmitter.emit(this.movieData.id);
  }


  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
