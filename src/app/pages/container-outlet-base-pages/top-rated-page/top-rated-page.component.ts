import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-rated-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl:
    '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl:
    '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class TopRatedComponent
  extends ContainerOutletBasePageComponent
  implements OnInit
{
  constructor(private movieManagerService: MovieManagerService) {
    super();
  }

  ngOnInit() {
    this.movieManagerService
      .getTopRated()
      .pipe(this.untilDestroyContext)
      .subscribe((topRated) => (this.movies = topRated));
  }
}
