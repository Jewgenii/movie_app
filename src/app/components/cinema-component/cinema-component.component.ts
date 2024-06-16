import { Component, OnInit } from '@angular/core';
import { MovieListComponent } from '../movie-list-component/movie-list-component.component';
import { CommonModule } from '@angular/common';
import { LocalizeImagePathPipe } from '../../pipes/localize-image-path.pipe';
import { MOCK_MOVIES } from '../../mock-data/movie-data';
import { MovieData } from '../../models/movieData';
import { MovieListData } from '../../models/movieListData';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

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

  public movieLists: MovieListData[] = [];
  public isNoMovies: boolean = false;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {

    let initialData: MovieData[] = MOCK_MOVIES;
    //  initialData = [];

    this.isNoMovies = initialData.length == 0;
    if (this.isNoMovies)
      return;

    this.movieLists.push({ name: 'Cast', movies: initialData, isAbleToModify: false });
    this.movieLists.push({ name: 'Favorites', movies: [], isAbleToModify: true });
    this.movieLists.push({ name: 'Watch later', movies: [], isAbleToModify: true });
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

  public onToggleFavorites(movie: MovieData): void {
    let lst = this.getListByName('Favorites');
    if (!lst || !lst.isAbleToModify)
      return;

    if (this.containsById(lst, movie)) {
      this.removeFromList(lst, movie);
      return;
    }

    this.addToList(lst, movie);
  }

  public onToggleWatchLater(movie: MovieData): void {
    let lst = this.getListByName('Watch later');
    if (!lst || !lst.isAbleToModify)
      return;

    if (this.containsById(lst, movie)) {
      this.removeFromList(lst, movie);
      return;
    }

    this.addToList(lst, movie);
  }

  private getListByName(name: string): MovieListData | undefined {
    for (let i = 0; i < this.movieLists.length; i++) {
      if (this.movieLists[i].name === name) {
        return this.movieLists[i];
      }
    }
    return undefined;
  }

  private containsById(list: MovieListData, movie: MovieData): boolean {
    return list.movies.some((m) => m.id === movie.id);
  }

  private addToList(list: MovieListData, movie: MovieData): void {
    list.movies.push(movie);
    this.showNotification('success', movie.title, `Was removed from ${list.name}`, 'br', 2000);
  }

  private removeFromList(list: MovieListData, movie: MovieData): void {
    list.movies = list.movies.filter((m) => m.id !== movie.id);
    this.showNotification('error', movie.title, `Was removed from ${list.name}`, 'br', 2000);
  }
}
