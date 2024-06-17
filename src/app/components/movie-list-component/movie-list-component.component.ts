import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MovieCardComponent } from '../movie-card-component/movie-card-component.component';
import { CommonModule } from '@angular/common';
import { MovieModel } from '../../models/movieModel';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';
import { CinemaComponent } from '../cinema-component/cinema-component.component';

@Component({
  selector: 'app-movie-list-component',
  standalone: true,
  imports: [CommonModule, MovieCardComponent,
    BadgeModule, PanelModule
  ],
  templateUrl: './movie-list-component.component.html',
  styleUrl: './movie-list-component.component.scss'
})
export class MovieListComponent {

  @Input() cinema!: CinemaComponent;
  @Input() name: string = "no name";
  @Input() movies: Array<MovieModel> = Array<MovieModel>();
  @Input() isReadOnly: boolean = false;

  public removeFromList(id: number): void {
    this.cinema.removeFromWatchLater(id);
    this.cinema.removeFromFavorites(id);
  }

  public addToFavorites(data: MovieModel): void {
    this.cinema.addToFavorites(data);
  }

  public addToWatchLater(data: MovieModel): void {
    this.cinema.addToWatchLater(data);
  }
}
