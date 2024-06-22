import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieModel } from '../../models/movieModel';

@Component({
  selector: 'app-movie-details-page',
  standalone: true,
  imports: [],
  templateUrl: './movie-details-page.component.html',
  styleUrl: './movie-details-page.component.scss'
})
export class MovieDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  public movieData!: MovieModel;

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      this.movieData = JSON.parse(data.get('movieData') as string);
    });
  }
}
