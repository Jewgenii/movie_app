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
import { catchError, delay, map, Observable, of, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
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
  isFavorite$: Subject<boolean> = new Subject<boolean>();
  isWatchList$: Subject<boolean> = new Subject<boolean>();

  public readonly wordsCount: number = 10

  public movieData: MovieData = {} as MovieData;
  public isInFavorites: boolean = false;
  public isInWatchList: boolean = false;
  public isDetails: boolean = false;

  constructor(private route: ActivatedRoute, private movieManagerService: MovieManagerService) {
    super();
  }

  ngOnInit() {
    this.isFavorite$.pipe(this.untilDestroyContext).subscribe(fav => this.isInFavorites = fav);

    this.isWatchList$.pipe(this.untilDestroyContext).subscribe(wl => this.isInWatchList = wl);

    this.route.paramMap.pipe(this.untilDestroyContext).subscribe(data => {

      const movieId = Number(data.get('id'));

      this.movieManagerService.getMovieDetails(movieId).pipe(this.untilDestroyContext)
        .subscribe(res => this.movieData = res);

      this.movieManagerService.getFavorites().pipe(this.untilDestroyContext)
        .subscribe(res => this.isFavorite$.next(res.some(e => e.id == movieId)));

      this.movieManagerService.getWatchList().pipe(this.untilDestroyContext)
        .subscribe(res => this.isWatchList$.next(res.some(e => e.id == movieId)))
    });


    this.movieManagerService.authenticateAndGetSession().pipe(this.untilDestroyContext)
      .subscribe(session => {
        this.session = session;
      });
  }

  override ngOnDestroy(): void {
    this.movieManagerService.removeSession(this.session.session_id).subscribe({
      next(value) {
        if (value.success) {
          console.log("session is removed");
        }
      },
      error(err) {
        console.log(err);
      },
      complete() {

      }
    }).unsubscribe();

    super.ngOnDestroy();
  }

  public addToFavorites(): void {
    this.movieManagerService.addToFavorite(this.movieData.id).pipe(this.untilDestroyContext).subscribe(res => {
      this.isFavorite$.next(res.success);
      console.log("added to favorites");
    });
  }

  public removeFromFavorites(): void {
    this.movieManagerService.removeFromFavorite(this.movieData.id).pipe(this.untilDestroyContext).subscribe(res => {

      if (res.success) {
        this.isFavorite$.next(false);
        console.log("removed from favorites");
      }

    });
  }

  public addToWatchList(): void {
    this.movieManagerService.addToWatchList(this.movieData.id).pipe(this.untilDestroyContext).subscribe(res => {
      this.isWatchList$.next(res.success);
      console.log("added to watchList");
    });
  }

  public removeFromWatchList(): void {
    this.movieManagerService.removeFromWatchList(this.movieData.id).pipe(this.untilDestroyContext).subscribe(res => {
      this.isWatchList$.next(res.success);
      console.log("removed from watchList");
    });
  }
}
