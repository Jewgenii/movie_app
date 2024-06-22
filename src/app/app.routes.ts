import { Routes } from '@angular/router';
import { MovieDetailsPageComponent } from './pages/movie-details-page/movie-details-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieGuard } from './guards/movieGuard';
import { MovieResolver } from './resolvers/movie.resolver';
import { MoviesPageComponent } from './pages/movies-page/movies-page.component';

export const routes: Routes = [
  {
    path: '', redirectTo: 'movieList', pathMatch: 'full'
  },
  {
    path: 'movieList',
    component: MovieListPageComponent,
    canActivate: [MovieGuard],
    resolve: { data: MovieResolver },
    children: [
      {
        path: 'details/:data',
        component: MoviesPageComponent,
        outlet: 'list-details-outlet'
      }
    ]
  },
  {
    path: 'details/:movieData',
    component: MovieDetailsPageComponent
  }
];

// export const routes: Routes = [
//   { path: '', redirectTo: '/parent', pathMatch: 'full' }, // Default route
//   {
//     path: 'parent',
//     component: MovieListPageComponent,
//     resolve: { data: MovieResolver },
//     children: [
//       {
//         path: 'child/:id',
//         component: MoviesPageComponent,
//         resolve: { data: MovieResolver },
//         outlet: 'childOutlet'
//       }
//     ]
//   },
//   { path: '**', redirectTo: '/parent' }

// ];
