
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { MockupMovieService } from './services/mockup-movie-service/mockup-movie-service';
import { MovieService } from './services/movie-service/movie.service';
import { LocalStorageService } from './services/local-storage-service/local-storage.service';
import { MovieManagerService } from './services/movie-manager/movie-manager.service';
import { CredentialsManagerService } from './services/credentials-service/credentials-manager.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, SidebarModule],
  providers: [CredentialsManagerService, LocalStorageService, MockupMovieService, MovieService, MovieManagerService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor(private primengConfig: PrimeNGConfig,
    private _movieManagerService: MovieManagerService) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this._movieManagerService.initialize();
  }
}
