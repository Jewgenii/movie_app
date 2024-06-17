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

  @Output() toggleFavoritesEmitter = new EventEmitter<MovieData>();
  @Output() toggleWatchLaterEmitter = new EventEmitter<MovieData>();

  @Input() movieData!: MovieData;

  public readonly wordsCount: number = 10;

  public isDetails: boolean = false;

  public toggleFavorites(): void {
    this.toggleFavoritesEmitter.emit({ ...this.movieData });
  }

  public toggleWatchLater(): void {
    this.toggleWatchLaterEmitter.emit({ ...this.movieData });
  }

  public showMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
