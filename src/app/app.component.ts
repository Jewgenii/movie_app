import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list-component/movie-list-component.component';
import { CinemaComponent } from './components/cinema-component/cinema-component.component';
import { CapitalizeTextPipe } from "./pipes/capitalize-text.pipe";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MovieListComponent, CinemaComponent, CapitalizeTextPipe]
})
export class AppComponent {
  title = 'angular_proj';



  movieData = {
    title: 'The Lord of the Rings',
    rating: 5,
    poster: 'https://d27jswm5an3efw.cloudfront.net/app/uploads/2019/08/image-url-3.jpg'
  };

  HandleFavorites(event: { rating: number, title: string }): void {
      console.log(event.rating);
      console.log(event.title);
  }

  HandleWatchList(event: any): void {

  }

  constructor() {
    console.log('constructor');
  }
}
