import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';  // Import RouterModule for [routerLink]

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
  imports: [MovieCardComponent, RouterModule]
})
export class FavoritesPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(
    private _movieService: MovieService
  ) {
    super();
  }

  ngOnInit(): void {
    this._movies = this._movieService.getFavorites();
  }
}
