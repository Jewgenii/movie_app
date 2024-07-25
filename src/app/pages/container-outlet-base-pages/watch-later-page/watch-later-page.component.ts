import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';
import { pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class WatchLaterPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(
    private _movieManager: MovieManagerService
  ) {
    super();
  }

  ngOnInit() {
    this._movieManager.getWatchList()
      .pipe(this.untilDestroyContext)
      .subscribe(
        watchList => this.movies = watchList
      );
  }
}
