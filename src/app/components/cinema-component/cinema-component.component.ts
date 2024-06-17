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

  public AddMovieToList(listName: string, data: MovieData): boolean {
    let lst = this.getListByName(listName);
    if (!lst || !lst.isAbleToModify)
      return false;

    if (this.containsById(lst, data))
      return false;

    this.addToList(lst, data);
    this.showNotification('success', data.title, `Was removed from ${lst.name}`, 'br', 2000);
    return true;
  }

  public RemoveMovieFromList(listName: string, data: MovieData): boolean {
    let lst = this.getListByName(listName);
    if (!lst || !lst.isAbleToModify)
      return false;

    if (!this.containsById(lst, data))
      return false;

    this.removeFromList(lst, data);
    this.showNotification('error', data.title, `Was removed from ${lst.name}`, 'br', 2000);
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

  private containsById(list: MovieListData, movie: MovieData): boolean {
    return list.movies.some((m) => m.id === movie.id);
  }

  private addToList(list: MovieListData, movie: MovieData): void {
    list.movies.push(movie);
  }

  private removeFromList(list: MovieListData, movie: MovieData): void {
    list.movies = list.movies.filter((m) => m.id !== movie.id);
  }
}
