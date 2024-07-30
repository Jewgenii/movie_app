import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router'; // Import RouterModule for [routerLink]
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  templateUrl:
    '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl:
    '../container-outlet-base-page/container-outlet-base-page.component.scss',
  imports: [MovieCardComponent, RouterModule],
})
export class FavoritesPageComponent
  extends ContainerOutletBasePageComponent
  implements OnInit
{
  constructor(private _movieManager: MovieManagerService) {
    super();
  }

  ngOnInit() {
    this._movieManager
      .getFavorites()
      .pipe(this.untilDestroyContext)
      .subscribe({
        next: (favorites) => {
          this.movies = favorites;
        },
        error: this.catchError,
      });
  }
}
