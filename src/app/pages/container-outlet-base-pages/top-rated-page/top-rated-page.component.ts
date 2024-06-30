import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieModel } from '../../../models/movieModel';
import { MovieNavigationService } from '../../../services/movie-navigation-service/movie-navigation.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-top-rated-page',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './top-rated-page.component.html',
  styleUrl: './top-rated-page.component.scss'
})
export class TopRatedComponent implements OnInit {

  constructor(private _movieService: MovieService,
    private _movieNavigationService: MovieNavigationService
  ) {

  }

  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getTopRated();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieNavigationService.openCard(id);
  }
}
