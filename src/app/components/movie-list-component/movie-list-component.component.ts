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
  @Input() title: string = "no name";
  @Input() movies: Array<MovieModel> = Array<MovieModel>();
  @Input() isReadOnly: boolean = false;

  public removeFromList(id: number): void {
    if (this.cinema.removeFromList(id, this.movies)) {
      this.cinema.showNotification('error', this.title, `Was removed from ${this.title}`, 'br', 2000);
    }
  }

  public addToFavorites(data: MovieModel): void {
    if (this.cinema.addToFavorites(data)) {
      this.cinema.showNotification('success', data.title, `Was added to ${this.title}`, 'br', 2000);
    }
  }

  public addToWatchLater(data: MovieModel): void {
    if (this.cinema.addToWatchLater(data)) {
      this.cinema.showNotification('success', data.title, `Was added to ${this.title}`, 'br', 2000);
    }
  }
}
