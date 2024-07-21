import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';

import { ImageModule } from 'primeng/image';
import { RatingModule } from 'primeng/rating';
import { ShortOverviewPipe } from '../../pipes/short-overview-pipe.pipe';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path-pipe.pipe';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieData } from '../../models/movie-list-model';
import { MovieManagerService } from '../../services/movie-manager/movie-manager.service';
import { delay, Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { BaseObservableDirective } from '../../directives/base-observable/base-observable.component';
import { CreateSessionResult } from '../../models/movie-service-models';

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
export class MovieCardPageComponent extends BaseObservableDirective implements OnInit, OnDestroy {

  session!: CreateSessionResult;
  favorite$: Subject<boolean> = new Subject<boolean>();
  watchLater$: Subject<boolean> = new Subject<boolean>();

  public readonly wordsCount: number = 10

  public movieData: MovieData = {} as MovieData;
  public isInFavorites: boolean = false;
  public isInWatchLater: boolean = false;
  public isDetails: boolean = false;

  constructor(private route: ActivatedRoute, private movieManagerService: MovieManagerService) {
    super();
  }

  ngOnInit() {
    const fav$ = this.favorite$.subscribe(fav => {
      this.isInFavorites = fav;
    });

    const wl$ = this.watchLater$.subscribe(wl => {
      this.isInWatchLater = wl;
    })

    this.subscription.add(fav$);
    this.subscription.add(wl$);


    this.subscription =
      this.route.paramMap.subscribe(async data => {

        const movieId: number = Number(data.get('id'));

        const tmpMovie$ =
          this.movieManagerService.getMovieDetails(movieId)
            .pipe(takeUntil(this.destroy$))
            .subscribe(res => this.movieData = res);

        this.subscription.add(tmpMovie$);
      });

    this.subscription = this.movieManagerService.authenticateAndGetSession().pipe(takeUntil(this.destroy$))
      .subscribe(session => {
        this.session = session;
      });
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    const _$ = this.movieManagerService.removeSession(this.session.session_id).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      }
    });



    this.subscription.add(_$);

  }

  public addToFavorites(): void {
    this.subscription =
      this.movieManagerService.addToFavorite({ media_type: "movie", favorite: true, media_id: this.movieData.id }).subscribe(res => {
        if (res.success) {
          this.favorite$.next(res.success);
        }
      });

    // let isAdded = this._movieService.addToFavorite(this.movieData);
    // if (isAdded) {
    //   this.isInFavorites = true;
    //   console.log(this.movieData.title + ' addToFavorites');
    // }
  }

  public removeFromFavorites(): void {
    // let isRemoved = this._movieService.removeFromFavorite(this.movieData.id);
    // if (isRemoved) {
    //   this.isInFavorites = false;
    //   console.log(this.movieData.title + ' removeFromFavorites');
    // }
  }

  public addToWatchLater(): void {
    // let isAdded = this._movieService.addToWatchLater(this.movieData)
    // if (isAdded) {
    //   this.isInWatchLater = true;
    //   console.log(this.movieData.title + ' addToWatchLater');
    // }
  }

  public removeFromWatchLater(): void {
    // let isRemoved = this._movieService.removeFromWatchLater(this.movieData.id);
    // if (isRemoved) {
    //   this.isInWatchLater = false;
    //   console.log(this.movieData.title + ' removeFromWatchLater');
    // }
  }
}
