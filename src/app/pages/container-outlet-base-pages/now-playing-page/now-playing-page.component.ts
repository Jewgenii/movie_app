import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieModel } from '../../../models/movieModel';
import { MovieNavigationService } from '../../../services/movie-navigation-service/movie-navigation.service';
import { MovieCardComponent } from '../../../components/movie-card/movie-card.component';

@Component({
    selector: 'app-now-playing-page',
    standalone: true,
    templateUrl: './now-playing-page.component.html',
    styleUrl: './now-playing-page.component.scss',
    imports: [MovieCardComponent]
})
export class NowPlayingPageComponent implements OnInit {

  constructor(private _movieService: MovieService,
    private _movieNavigationService: MovieNavigationService
  ) {

  }

  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getNowPlaying();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieNavigationService.openCard(id);
  }

}
