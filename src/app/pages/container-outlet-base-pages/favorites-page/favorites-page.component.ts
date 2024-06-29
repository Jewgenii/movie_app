import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie-service/movie.service';
import { MovieModel } from '../../../models/movieModel';
import { MovieNavigationService } from '../../../services/movie-navigation-service/movie-navigation.service';
import { OnSameUrlNavigation } from '@angular/router';

@Component({
  selector: 'app-favorites-page',
  standalone: true,
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.scss'
})
export class FavoritesPageComponent implements OnInit {

  constructor(private _movieService: MovieService,
    private _movieNavigationService: MovieNavigationService
  ) {
    console.log("FavoritesPageComponent ctor")
  }

  public movies: Array<MovieModel> = [];

  ngOnInit(): void {
    this.movies = this._movieService.getFavorites();
  }

  openCard(id: number | undefined): void {
    if (id == undefined) {
      console.log('id is undefined');
      return;
    }

    this._movieNavigationService.openCard(id);
  }

}
