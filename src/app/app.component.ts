
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { MovieService } from './services/movie-service/movie.service';
import { MovieCardOpenerService } from './services/movie-card-opener-service/movie-card-opener.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, SidebarModule],
  providers: [MovieService, MovieCardOpenerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
