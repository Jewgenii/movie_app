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
import { Subject, tap } from 'rxjs';
import { BaseObservableDirective } from '../../directives/base-observable/base-observable.component';
import { CreateSessionResult } from '../../models/movie-service-models';

@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [
    CommonModule,
    LocalizeImagePathPipe,
    ShortOverviewPipe,
    CardModule,
    ButtonModule,
    ImageModule,
    RatingModule,
  ],
  templateUrl: './movie-card-page.component.html',
  styleUrl: './movie-card-page.component.scss',
})
export class MovieCardPageComponent
  extends BaseObservableDirective
  implements OnInit, OnDestroy
{
  private session!: CreateSessionResult;
  private isFavorite$: Subject<boolean> = new Subject<boolean>();
  private isWatchList$: Subject<boolean> = new Subject<boolean>();

  public readonly wordsCount: number = 10;

  public movieData: MovieData = {} as MovieData;
  public isInFavorites: boolean = false;
  public isInWatchList: boolean = false;
  public isDetails: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieManagerService: MovieManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.isFavorite$
      .pipe(this.untilDestroyContext)
      .subscribe((isTrue) => (this.isInFavorites = isTrue));

    this.isWatchList$
      .pipe(this.untilDestroyContext)
      .subscribe((isTrue) => (this.isInWatchList = isTrue));

    const movieId = Number(this.route.snapshot.params['id']);

    this.movieManagerService
      .getMovieDetails(movieId)
      .pipe(this.untilDestroyContext)
      .subscribe((movieData) => (this.movieData = movieData));

    this.movieManagerService
      .getFavorites()
      .pipe(this.untilDestroyContext)
      .subscribe((res) =>
        this.isFavorite$.next(res.some((e) => e.id == movieId))
      );

    this.movieManagerService
      .getWatchList()
      .pipe(this.untilDestroyContext)
      .subscribe((res) =>
        this.isWatchList$.next(res.some((e) => e.id == movieId))
      );

    this.movieManagerService
      .authenticateAndGetSession()
      .pipe(this.untilDestroyContext)
      .subscribe((session) => (this.session = session));
  }

  override ngOnDestroy(): void {
    this.movieManagerService
      .removeSession(this.session.session_id)
      .subscribe({
        next(resp) {
          if (resp.success) {
            console.log('session is removed');
          }
        },
        error: this.catchError,
      })
      .unsubscribe();

    super.ngOnDestroy();
  }

  public addToFavorites(): void {
    this.movieManagerService
      .addToFavorite(this.movieData.id)
      .pipe(this.untilDestroyContext)
      .subscribe((resp) => {
        if (!resp.success) {
          console.log('ERROR: added to favorites');
          return;
        }

        this.isFavorite$.next(true);
        console.log('added to favorites');
      });
  }

  public removeFromFavorites(): void {
    this.movieManagerService
      .removeFromFavorite(this.movieData.id)
      .pipe(this.untilDestroyContext)
      .subscribe((resp) => {
        if (!resp.success) {
          console.log('ERROR: removed from favorites');
          return;
        }

        this.isFavorite$.next(false);
        console.log('removed from favorites');
      });
  }

  public addToWatchList(): void {
    this.movieManagerService
      .addToWatchList(this.movieData.id)
      .pipe(this.untilDestroyContext)
      .subscribe((resp) => {
        if (!resp.success) {
          console.log('ERROR: added to watchList');
          return;
        }

        this.isWatchList$.next(true);
        console.log('added to watchList');
      });
  }

  public removeFromWatchList(): void {
    this.movieManagerService
      .removeFromWatchList(this.movieData.id)
      .pipe(this.untilDestroyContext)
      .subscribe((resp) => {
        if (!resp.success) {
          console.log('ERROR: removed from watchList');
          return;
        }

        this.isWatchList$.next(false);
        console.log('removed from watchList');
      });
  }
}
