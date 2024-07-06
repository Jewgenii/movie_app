
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { HttpHeaders } from '@angular/common/http';
import { MovieManagerService } from '../../services/movie-manager/movie-manager.service';


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
    public route: ActivatedRoute,
    private _router: Router,
    private _movieMangerService: MovieManagerService) {
  }

  async ngOnInit(): Promise<void> {

    let popular = await this._movieMangerService.getPopular();

  }

  navigateToContainerOutlet(routeName: string) {
    this._router.navigate([{ outlets: { 'container-outlet': routeName }, }], { relativeTo: this.route });
  }
}
