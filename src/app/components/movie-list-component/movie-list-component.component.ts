import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MovieCardComponent } from '../movie-card-component/movie-card-component.component';
import { CommonModule } from '@angular/common';
import { MovieData } from '../../models/movieData';
import { BadgeModule } from 'primeng/badge';
import { PanelModule } from 'primeng/panel';

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

  @Output() addToFavoriteEmitter = new EventEmitter<MovieData>();
  @Output() addToWatchListEmitter = new EventEmitter<MovieData>();

  @Input() name: string = "no name";
  @Input() movies: MovieData[] = [];
  @Input() isAbleToModify: boolean = false;

  public handleFavorites(data: MovieData): void {
    if (this.isAbleToModify)
      return;

    // if (this.isInList(this.movies, data)) {
    //   this.onRemove(data.id);
    // }

    this.addToFavoriteEmitter.emit(data);
  }

  public handleWatchList(data: MovieData): void {
    if (this.isAbleToModify)
      return;

    // if (this.isInList(this.movies, data)) {
    //   this.onRemove(data.id);
    // }
    this.addToWatchListEmitter.emit(data);
  }

  public onRemove(id: number): void {
    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  public ngForTrackByIndex(index: number, movie: MovieData): number {
    return movie.id;
  }

  private isInList(lst: MovieData[], movie: MovieData): boolean {
    return lst.some((m) => m.id === movie.id);
  }
}
