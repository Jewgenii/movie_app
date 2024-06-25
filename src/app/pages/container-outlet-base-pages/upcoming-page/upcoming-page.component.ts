import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieModel } from '../../../models/movieModel';
import { MovieCardOpenerService } from '../../../services/movie-card-opener-service/movie-card-opener.service';

@Component({
  selector: 'app-upcoming-page',
  standalone: true,
  imports: [],
  templateUrl: './upcoming-page.component.html',
  styleUrl: './upcoming-page.component.scss'
})
export class UpcomingPageComponent implements OnInit {

  constructor(private _movieService: MovieService,
    private _movieCardOpenerService: MovieCardOpenerService
  ) {

  }

  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getUpcoming();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieCardOpenerService.openCard(id);
  }

}
