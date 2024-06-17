import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list-component/movie-list-component.component';
import { CinemaComponent } from './components/cinema-component/cinema-component.component';
import { CapitalizeTextPipe } from "./pipes/capitalize-text.pipe";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, MovieListComponent, CinemaComponent, CapitalizeTextPipe
  ]
})
export class AppComponent implements OnInit {
  title(title: string) {
    return "Movie App";
  }

  constructor(private primengConfig: PrimeNGConfig) {
  }

  ngOnInit() {
    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100,    // dialog, sidebar
      overlay: 1000,  // dropdown, overlaypanel
      menu: 1000,     // overlay menus
      tooltip: 1100   // tooltip
    };
  }
}
