
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { MovieNavigationService } from '../../services/movie-navigation-service/movie-navigation.service';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-movie-playlists-page',
  standalone: true,
  imports: [SidebarModule,
    ButtonModule, RouterModule, PanelModule, ListboxModule, SplitterModule,
    TabMenuModule
  ],
  templateUrl: './movie-playlists-page.component.html',
  styleUrl: './movie-playlists-page.component.scss'
})
export class MoviePlayListsPageComponent implements OnInit {



  constructor(
    private _route: ActivatedRoute,
    private _movieNavigationService: MovieNavigationService) {
  }
  ngOnInit(): void {

  }

  navigateToContainerOutlet(routeName: string) {
    this._movieNavigationService.navigateToContainerOutlet(this._route, routeName);
  }
}
