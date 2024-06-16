import { Component, Input, OnInit, Output } from '@angular/core';
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

  showBottomRight(movie: MovieData, lstName: string = '') {
    this.messageService.add(
      {
        severity: 'success',
        summary: `"${movie.title}"`,
        detail: 'was added to ' + lstName,
        key: 'br',
        life: 2000
      });
  }

  public onAddMovieToFavorites(movie: MovieData): void {

    let lst = this.findListByName('Favorites');
    if (lst !== undefined) {
      if (this.addToListIfNotContains(lst.movies, movie)) {
        this.showBottomRight(movie, 'Favorites');
      }
    }
  }

  public onAddMovieToWatchLater(movie: MovieData): void {
    let lst = this.findListByName('Watch later');
    if (lst !== undefined) {
      if (this.addToListIfNotContains(lst.movies, movie)) {
        this.showBottomRight(movie, 'Watch later');
      }
    }
  }

  private findListByName(name: string): MovieListData | undefined {
    for (let i = 0; i < this.movieLists.length; i++) {
      if (this.movieLists[i].name === name) {
        return this.movieLists[i];
      }
    }
    return undefined;
  }

  private addToListIfNotContains(list: MovieData[], movie: MovieData): boolean {
    var contains = list.includes(movie)
    if (!contains) {
      list.push(movie);
      return true;
    }
    return false;
  }
}
