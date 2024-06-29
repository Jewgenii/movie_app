import { CommonModule } from '@angular/common';
import { EventEmitter, Input, Output } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ShortOverviewPipe } from '../../pipes/short-overview-pipe.pipe';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path-pipe.pipe';

import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movieModel';
import { MovieService } from '../../services/movie-service/movie.service';


@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [
    CommonModule,
    LocalizeImagePathPipe, ShortOverviewPipe,
    CardModule, ButtonModule, ImageModule, RatingModule
  ],
  templateUrl: './movie-card-page.component.html',
  styleUrl: './movie-card-page.component.scss'
})
export class MovieCardPageComponent {

  public movieData: MovieModel = {} as MovieModel;
  public isInFavorites: boolean = false;
  public isInWatchLater: boolean = false;

  constructor(private _route: ActivatedRoute,
    private _movieService: MovieService
  ) {
  }

  ngOnInit(): void {

    this._route.paramMap.subscribe(data => {
      try {

        let id = Number(data.get('id'));
        this.movieData = this._movieService.getMovieById(id);

        this.isInFavorites = this._movieService.getFavorites().some(e => e.id === this.movieData.id);
        this.isInWatchLater = this._movieService.getWatchLater().some(e => e.id === this.movieData.id);

      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message)
        }
      }
    });
  }

  public readonly wordsCount: number = 10
  public isDetails: boolean = false;

  public addToFavorites(): void {
    let isAdded = this._movieService.addToFavorite(this.movieData);
    if (isAdded) {
      this.isInFavorites = true;
      console.log(this.movieData.title + ' addToFavorites');
    }
  }

  public removeFromFavorites(): void {
    let isRemoved = this._movieService.removeFromFavorite(this.movieData.id);
    if (isRemoved) {
      this.isInFavorites = false;
      console.log(this.movieData.title + ' removeFromFavorites');
    }
  }

  public addToWatchLater(): void {
    let isAdded = this._movieService.addToWatchLater(this.movieData)
    if (isAdded) {
      this.isInWatchLater = true;
      console.log(this.movieData.title + ' addToWatchLater');
    }
  }

  public removeFromWatchLater(): void {
    let isRemoved = this._movieService.removeFromWatchLater(this.movieData.id);
    if (isRemoved) {
      this.isInWatchLater = false;
      console.log(this.movieData.title + ' removeFromWatchLater');
    }
  }

  public toggleMovieDetails(): void {
    this.isDetails = !this.isDetails;
  }
}
