import { Component } from '@angular/core';
import { MovieModel } from '../../../models/movie-model';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';
import { RouterModule } from '@angular/router';  // Import RouterModule for [routerLink]

@Component({
  selector: 'app-container-outlet-base-page',
  standalone: true,
  imports: [MovieCardComponent, RouterModule],
  templateUrl: './container-outlet-base-page.component.html',
  styleUrl: './container-outlet-base-page.component.scss'
})
export class ContainerOutletBasePageComponent {

  protected _movies!: Array<MovieModel>;

  constructor() {

  }

}
