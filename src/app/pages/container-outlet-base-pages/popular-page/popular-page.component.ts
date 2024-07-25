import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';

@Component({
  selector: 'app-popular-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class PopularComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(private movieManagerService: MovieManagerService
  ) {
    super();
  }

  ngOnInit() {
    this.movieManagerService.getPopular().subscribe(popular => this.movies = popular);
  }
}
