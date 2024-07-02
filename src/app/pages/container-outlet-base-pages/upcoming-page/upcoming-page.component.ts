import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-upcoming-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class UpcomingPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(private _movieService: MovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this._movies = this._movieService.getUpcoming();
  }
}
