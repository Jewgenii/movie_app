import { Routes } from '@angular/router';
import { MovieCardPageComponent } from './pages/movie-card-page/movie-card-page.component';
import { MoviePlayListsPageComponent } from './pages/movie-playlists-page/movie-playlists-page.component'
import { MovieGuard } from './guards/movieGuard';
import { MovieResolver } from './resolvers/movie.resolver';
import { NowPlayingPageComponent } from './pages/container-outlet-base-pages/now-playing-page/now-playing-page.component';
import { PopularComponent } from './pages/container-outlet-base-pages/popular-page/popular-page.component';
import { TopRatedComponent } from './pages/container-outlet-base-pages/top-rated-page/top-rated-page.component';
import { UpcomingPageComponent } from './pages/container-outlet-base-pages/upcoming-page/upcoming-page.component';
import { FavoritesPageComponent } from './pages/container-outlet-base-pages/favorites-page/favorites-page.component';
import { WatchLaterPageComponent } from './pages/container-outlet-base-pages/watch-later-page/watch-later-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '', redirectTo: '/list/(container-outlet:nowPlaying)', pathMatch: 'full'
  },
  {
    path: 'list', redirectTo: '/list/(container-outlet:nowPlaying)', pathMatch: 'full'
  },
  {
    path: 'list',
    component: MoviePlayListsPageComponent,
    canActivate: [MovieGuard],
    resolve: { data: MovieResolver },
    children: [
      {
        path: 'nowPlaying',
        component: NowPlayingPageComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      },
      {
        path: 'popular',
        component: PopularComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      },
      {
        path: 'top',
        component: TopRatedComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      },
      {
        path: 'upcoming',
        component: UpcomingPageComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      },
      {
        path: 'favorites',
        component: FavoritesPageComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      },
      {
        path: 'watchLater',
        component: WatchLaterPageComponent,
        outlet: 'container-outlet',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'movieCard/:id',
    pathMatch: 'full',
    component: MovieCardPageComponent
  },
  {
    path: 'not-found', component: NotFoundPageComponent
  },
  { path: '**', redirectTo: 'not-found' }

];
