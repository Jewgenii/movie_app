import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { ContainerOutletBasePageComponent } from '../container-outlet-base-page/container-outlet-base-page.component';
import { RouterModule } from '@angular/router';
import { MovieManagerService } from '../../../services/movie-manager/movie-manager.service';

@Component({
  selector: 'app-upcoming-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: '../container-outlet-base-page/container-outlet-base-page.component.html',
  styleUrl: '../container-outlet-base-page/container-outlet-base-page.component.scss',
})
export class UpcomingPageComponent extends ContainerOutletBasePageComponent implements OnInit {

  constructor(private _movieManagerService: MovieManagerService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this._movies = await this._movieManagerService.getUpcoming();
  }
}
