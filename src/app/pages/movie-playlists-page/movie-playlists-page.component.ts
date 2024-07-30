import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { BaseObservableDirective } from '../../directives/base-observable/base-observable.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-playlists-page',
  standalone: true,
  imports: [
    SidebarModule,
    ButtonModule,
    RouterModule,
    PanelModule,
    ListboxModule,
    SplitterModule,
    TabMenuModule,
  ],
  templateUrl: './movie-playlists-page.component.html',
  styleUrl: './movie-playlists-page.component.scss',
})
export class MoviePlayListsPageComponent extends BaseObservableDirective {
  constructor() {
    super();
  }
}
