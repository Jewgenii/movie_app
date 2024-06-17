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
  public readonly movieLists: MovieListData[] = [];
  public isNoMovies: boolean = false;

  public addToFavorites(data: MovieData): void {
    this.addMovieToList("Favorites", data);
  }

  public onRemove(list :MovieListData, id: number): void {
    this.removeMovieFromList(list.name, id);
  }

  public removeFromFavorites(id: number): void {
    this.removeMovieFromList("Favorites", id);
  }

  public addToWatchLater(data: MovieData): void {
    this.addMovieToList("Watch later", data);
  }

  public removeFromWatchLater(id: number): void {
    this.removeMovieFromList("Watch later", id);
  }

  private addMovieToList(listName: string, data: MovieData): boolean {
    let lst = this.getListByName(listName);
    if (!lst || !lst.isAbleToModify)
      return false;

    let existingMovie = this.containsById(lst, data.id);
    if (existingMovie)
      return false;

    this.addToList(lst, data);
    this.showNotification('success', data.title, `Was removed from ${lst.name}`, 'br', 2000);
    return true;
  }

  private removeMovieFromList(listName: string, id: number): boolean {
    let lst = this.getListByName(listName);
    if (!lst || !lst.isAbleToModify)
      return false;

    let existingMovie = this.containsById(lst, id);
    if (!existingMovie)
      return false;

    this.removeFromList(lst, id);
    this.showNotification('error', existingMovie.title, `Was removed from ${lst.name}`, 'br', 2000);
    return true;
  }

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

  private getListByName(name: string): MovieListData | undefined {
    for (let i = 0; i < this.movieLists.length; i++) {
      if (this.movieLists[i].name === name) {
        return this.movieLists[i];
      }
    }
    return undefined;
  }

  private containsById(list: MovieListData, id: number): MovieData {
    return list.movies.find((m) => m.id === id)!;
  }

  private addToList(list: MovieListData, movie: MovieData): void {
    list.movies.push(movie);
  }

  private removeFromList(list: MovieListData, id: number): void {
    list.movies = list.movies.filter((m) => m.id !== id);
  }
}
