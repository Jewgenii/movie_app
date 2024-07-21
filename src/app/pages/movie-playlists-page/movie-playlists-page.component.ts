
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { MovieManagerService } from '../../services/movie-manager/movie-manager.service';
import { Observable, takeUntil } from 'rxjs';
import { BaseObservableDirective } from '../../directives/base-observable/base-observable.component';
import { CreateSessionResult } from '../../models/movie-service-models';


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
export class MoviePlayListsPageComponent extends BaseObservableDirective {

  constructor(private _movieMangerService: MovieManagerService) {
    super();
  }
}
