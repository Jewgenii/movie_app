import { Component, OnInit } from '@angular/core';
import { MovieModel } from '../../../models/movieModel';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieCardOpenerService } from '../../../services/movie-card-opener-service/movie-card-opener.service';

@Component({
  selector: 'app-popular-page',
  standalone: true,
  imports: [],
  templateUrl: './popular-page.component.html',
  styleUrl: './popular-page.component.scss'
})
export class PopularComponent implements OnInit {

  constructor(private _movieService: MovieService,
              private _movieCardOpenerService: MovieCardOpenerService
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

    this._movieCardOpenerService.openCard(id);
  }

}
