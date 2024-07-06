import { Component, OnInit } from '@angular/core';
import { MockupMovieService } from '../../../services/mockup-movie-service/mockup-movie-service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class WatchLaterPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(
    private _movieService: MockupMovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this._movies = this._movieService.getWatchLater();
  }
}
