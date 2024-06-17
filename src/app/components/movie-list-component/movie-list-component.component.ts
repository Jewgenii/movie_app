import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { MovieCardComponent } from '../movie-card-component/movie-card-component.component';
import { CommonModule } from '@angular/common';
import { MovieData } from '../../models/movieData';
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
  @Input() movies: MovieData[] = [];
  @Input() isAbleToModify: boolean = false;

  public ngForTrackByIndex(index: number, movie: MovieData): number {
    return movie.id;
  }
}
