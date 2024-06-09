import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponentComponent } from './movie-list-component/movie-list-component.component';
import { CinemaComponentComponent } from './cinema-component/cinema-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CinemaComponentComponent, MovieListComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
