import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieModel } from '../../../models/movieModel';
import { MovieNavigationService } from '../../../services/movie-navigation-service/movie-navigation.service';

@Component({
  selector: 'app-watch-later-page',
  standalone: true,
  imports: [],
  templateUrl: './watch-later-page.component.html',
  styleUrl: './watch-later-page.component.scss'
})
export class WatchLaterPageComponent implements OnInit {

  constructor(private _movieService: MovieService,
    private _movieNavigationService: MovieNavigationService
  ) {

  }


  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getWatchLater();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieNavigationService.openCard(id);
  }
}
