import { Component, Input, OnInit } from '@angular/core';
import { ShortOverviewPipe } from "../../pipes/short-overview-pipe.pipe";
import { LocalizeImagePathPipe } from "../../pipes/localize-image-path-pipe.pipe";
import { CardModule } from 'primeng/card';
import { RouterOutlet } from '@angular/router';
import { MovieModel } from '../../models/movie-list-model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  imports: [ShortOverviewPipe, LocalizeImagePathPipe, CardModule, RouterOutlet]
})
export class MovieCardComponent {

  @Input() movieData!: MovieModel;

  constructor() {
  }
}
