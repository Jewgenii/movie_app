import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { Route, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { ListboxModule } from 'primeng/listbox';
import { SplitterModule } from 'primeng/splitter';

//export mock data
import { nowPlayingMovies } from '../../mock-data/mock-data';
import { popularMovies } from '../../mock-data/mock-data';
import { topRatedMovies } from '../../mock-data/mock-data';
import { upcomingMovies } from '../../mock-data/mock-data';

import { ListModel } from '../../models/listModel';
import { MovieModel } from '../../models/movieModel';
import { state } from '@angular/animations';
import { TmplAstBoundAttribute } from '@angular/compiler';


@Component({
  selector: 'app-movie-list-page',
  standalone: true,
  imports: [SidebarModule, ButtonModule, RouterModule, PanelModule, ListboxModule, SplitterModule],
  templateUrl: './movie-list-page.component.html',
  styleUrl: './movie-list-page.component.scss'
})
export class MovieListPageComponent implements OnInit {

  navigateToMovies(list: ListModel) {

    this.router.navigate(
      [{
        outlets: { 'list-details-outlet': ['details', list.title] },
      }],
      {
        relativeTo: this.route,
        state: { data: list }
      }
    ).then((e) => {
      console.log('navigated');
    });
  }


  constructor(private router: Router, private route: ActivatedRoute) { }

  public sidebarVisible: boolean = true;
  public nowPlaying: any[] = [];

  public lists: ListModel[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(data => {
      console.log(data);
      //read mock data as array

      this.lists.push({ title: 'Now Playing', movies: nowPlayingMovies as MovieModel[] });
      this.lists.push({ title: 'Popular', movies: popularMovies as MovieModel[] });
      this.lists.push({ title: 'Top rated', movies: topRatedMovies as MovieModel[] });
      this.lists.push({ title: 'Upcoming', movies: upcomingMovies as MovieModel[] });

      this.nowPlaying = nowPlayingMovies;
    });
  }


  navigateToCard(movie: any) {
    console.log(movie);
  }

  changeVisibility() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}
