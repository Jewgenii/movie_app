import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { MovieService } from './services/movie-services/movie.service';
import { LocalStorageService } from './services/local-storage-service/local-storage.service';
import { MovieManagerService } from './services/movie-manager/movie-manager.service';
import { CredentialsManagerService } from './services/credentials-service/credentials-manager.service';
import { MovieAuthService } from './services/movie-services/auth-service/movie-auth.service';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterOutlet, SidebarModule],
  providers: [
    LocalStorageService,
    CredentialsManagerService,
    MovieService,
    MovieAuthService,
    MovieManagerService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }
}
