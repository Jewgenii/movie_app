
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { MovieNavigationService } from '../../services/movie-navigation-service/movie-navigation.service';

@Component({
  selector: 'app-movie-playlists-page',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterModule, PanelModule, ListboxModule, SplitterModule],
  templateUrl: './movie-playlists-page.component.html',
  styleUrl: './movie-playlists-page.component.scss'
})
export class MoviePlayListsPageComponent {

  constructor(
    private _route: ActivatedRoute,
    private _movieNavigationService: MovieNavigationService) {
  }

  navigateToContainerOutlet(routeName: string) {
    this._movieNavigationService.navigateToContainerOutlet(this._route, routeName);
  }
}
