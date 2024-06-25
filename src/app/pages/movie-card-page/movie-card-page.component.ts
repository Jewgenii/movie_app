import { Component, OnInit, numberAttribute } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movieModel';
import { MovieService } from '../../services/movie-service/movie.service';

@Component({
  selector: 'app-movie-card-page',
  standalone: true,
  imports: [],
  templateUrl: './movie-card-page.component.html',
  styleUrl: './movie-card-page.component.scss'
})
export class MovieCardPageComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private movieService: MovieService
  ) {
  }

  public movieData!: MovieModel;

  ngOnInit(): void {

    this.route.paramMap.subscribe(data => {

      let id = Number(data.get('id'));

      let res = this.movieService.getMovieById(id);
      if (res != null) {
        this.movieData = res;
      }
    });

  }
}
