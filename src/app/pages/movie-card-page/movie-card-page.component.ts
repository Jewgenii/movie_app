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
import { delay, map, Observable, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
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

    this.favorite$.pipe(takeUntil(this.destroy$)).subscribe(fav => {
      this.isInFavorites = fav;
    });

    this.watchLater$.pipe(takeUntil(this.destroy$)).subscribe(wl => {
      this.isInWatchLater = wl;
    })

    this.route.paramMap.subscribe(async data => {

      const movieId = Number(data.get('id'));

      this.movieManagerService.getFavorites().pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          const index = res.findIndex(e => e.id == movieId);
          if (index != -1) {
            this.movieData = res.at(index)!;
            this.favorite$.next(true);
          } else {
            this.movieManagerService.getMovieDetails(movieId).pipe(takeUntil(this.destroy$)).subscribe(res => this.movieData = res);
          }
        })
    });

    this.movieManagerService.authenticateAndGetSession().pipe(takeUntil(this.destroy$))
      .subscribe(session => {
        this.session = session;
      });
  }

  override ngOnDestroy(): void {
    this.movieManagerService.removeSession(this.session.session_id).pipe(takeUntil(this.destroy$)).subscribe({
      next(value) {
        console.log(value);
      },
      error(err) {
        console.log(err);
      },
      complete() {
        super.ngOnDestroy();
      }
    });
  }

  public addToFavorites(): void {
    this.movieManagerService.addToFavorite(this.movieData.id).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.favorite$.next(res.success);
    });
  }

  public removeFromFavorites(): void {
    this.movieManagerService.removeFromFavorite(this.movieData.id).pipe(takeUntil(this.destroy$)).subscribe(res => {
      this.favorite$.next(!res.success);
    });
  }

  public addToWatchLater(): void {

  }

  public removeFromWatchLater(): void {

  }
}
