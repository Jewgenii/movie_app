import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../../models/movieModel';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieNavigationService } from '../../../services/movie-navigation-service/movie-navigation.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-popular-page',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './popular-page.component.html',
  styleUrl: './popular-page.component.scss',
})
export class PopularComponent implements OnInit {

  constructor(private _movieService: MovieService,
              private _movieNavigationService: MovieNavigationService
  ) {

  }

  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getPopular();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieNavigationService.openCard(id);
  }

}
