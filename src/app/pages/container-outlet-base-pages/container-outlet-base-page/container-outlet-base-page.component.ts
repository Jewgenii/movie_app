import { Component } from '@angular/core';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { RouterModule } from '@angular/router'; // Import RouterModule for [routerLink]
import { MovieData } from '../../../models/movie-list-model';
import { BaseObservableDirective } from '../../../directives/base-observable/base-observable.component';

@Component({
  selector: 'app-container-outlet-base-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: './container-outlet-base-page.component.html',
  styleUrl: './container-outlet-base-page.component.scss',
})
export class ContainerOutletBasePageComponent extends BaseObservableDirective {
  protected movies!: Array<MovieData>;

  constructor() {
    super();
  }
}
