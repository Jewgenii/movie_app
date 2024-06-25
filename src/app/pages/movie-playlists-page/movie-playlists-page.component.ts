import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';

@Component({
  selector: 'app-movie-playlists-page',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterModule, PanelModule, ListboxModule, SplitterModule],
  templateUrl: './movie-playlists-page.component.html',
  styleUrl: './movie-playlists-page.component.scss'
})
export class MoviePlayListsPageComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  navigateToContainerOutlet(route: string) {
    this.router.navigate([{ outlets: { 'container-outlet': route }, }], { relativeTo: this.route })
      .then(this.handleNavigationResult)
  }

  private handleNavigationResult(e: boolean): void {
    if (e) {
      console.log('Navigation is successful!');
    } else {
      console.log('Navigation has failed!');
    }
  }
}
