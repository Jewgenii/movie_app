import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';  // Import RouterModule for [routerLink]
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';

@Component({
  selector: 'app-now-playing-page',
  standalone: true,
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
  imports: [MovieCardComponent, RouterModule]
})
export class NowPlayingPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(private movieManagerService: MovieManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.movieManagerService.getNowPlaying().subscribe(nowPlaying => this.movies = nowPlaying);
  }

}
