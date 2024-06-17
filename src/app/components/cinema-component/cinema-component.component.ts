import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../movie-list-component/movie-list-component.component';
import { CommonModule } from '@angular/common';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MOCK_MOVIES } from '../../mock-data/movie-data';
import { MovieModel } from '../../models/movieModel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MovieListModel } from '../../models/MovieListModel';

@Component({
  selector: 'app-cinema-component',
  standalone: true,
  imports: [MovieListComponent, CommonModule,
    LocalizeImagePathPipe,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './cinema-component.component.html',
  styleUrl: './cinema-component.component.scss'
})
export class CinemaComponent implements OnInit {

  public castMovies!: MovieListModel;
  public favoriteMovies!: MovieListModel;
  public watchLaterMovies!: MovieListModel;

  constructor(private messageService: MessageService) { }

  public ngOnInit(): void {
    this.castMovies = { name: 'Cast', movies: MOCK_MOVIES, isReadOnly: true };
    this.favoriteMovies = { name: 'Favorites', movies: [], isReadOnly: false };
    this.watchLaterMovies = { name: 'Watch later', movies: [], isReadOnly: false };
  }

  public removeFromList(id: number, listComponent: MovieListComponent): boolean {
    // removing items by splice because this.movies is passed by reference
    let index = listComponent.movies.indexOf(listComponent.movies.find((m) => m.id === id)!);
    if (index > -1) {
      listComponent.movies.splice(index, 1);
      return true;
    }

    return false
  }

  public addToFavorites(data: MovieModel): boolean {
    const isInList = this.favoriteMovies.movies.some((m) => m.id === data.id);

    if (!isInList) {
      this.favoriteMovies.movies.push(data);
      return true;
    }

    return false;
  }

  public addToWatchLater(data: MovieModel): boolean {
    const isInList = this.watchLaterMovies.movies.some((m) => m.id === data.id);

    if (!isInList) {
      this.watchLaterMovies.movies.push(data);
      return true;
    }
    return false;
  }

  public showNotification(severity: string, summary: string, detail: string, key: string, life: number): void {
    this.messageService.add(
      {
        severity: severity,
        summary: summary,
        detail: detail,
        key: key,
        life: 2000
      });
  }
}
