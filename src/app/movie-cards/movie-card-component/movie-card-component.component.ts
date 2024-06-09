import { CommonModule } from '@angular/common';
import { Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, input } from '@angular/core';

@Component({
  selector: 'app-movie-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card-component.component.html',
  styleUrl: './movie-card-component.component.scss'
})
export class MovieCardComponentComponent implements OnInit, DoCheck, OnChanges {

  @Input() movieData: any = [];

  @Output() addFavoriteEmitter = new EventEmitter<any>();
  @Output() addWatchListEmitter = new EventEmitter<any>();

  public details: boolean = false;

  constructor() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.movieData.poster_path = 'assets/images/' + this.movieData.poster_path ;
  }

  ngDoCheck(): void {

  }

  ngOnInit(): void {
  }

  public addToFavorites(): void {

    this.movieData.wasAddedToFavorites = true;
    this.addFavoriteEmitter.emit(this.movieData);
  }

  public addToWatchList(): void {

    // this.movieData.wasAddedToWatchList = true;
    // this.wasAddedToWatchList = true;
    this.movieData.wasAddedToWatchList = true;
    this.addWatchListEmitter.emit(this.movieData);
  }

  public showMovieDetails(): void {
    this.details = !this.details;
  }
}
