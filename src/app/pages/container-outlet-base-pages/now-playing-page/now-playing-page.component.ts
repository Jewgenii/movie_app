import { Component, OnInit } from '@angular/core';
import { MockupMovieService } from '../../../services/mockup-movie-service/mockup-movie-service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';  // Import RouterModule for [routerLink]

@Component({
  selector: 'app-now-playing-page',
  standalone: true,
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
  imports: [MovieCardComponent, RouterModule]
})
export class NowPlayingPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(private _movieService: MockupMovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this._movies = this._movieService.getNowPlaying();
  }

}
