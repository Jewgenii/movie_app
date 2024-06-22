import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, OnSameUrlNavigation, Router } from '@angular/router';
import { ListModel } from '../../models/listModel';
import { MovieModel } from '../../models/movieModel';

@Component({
  selector: 'app-movies-page',
  standalone: true,
  imports: [],
  templateUrl: './movies-page.component.html',
  styleUrl: './movies-page.component.scss'
})
export class MoviesPageComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  public listName: string | null = null;

  public listModel!: ListModel | null;

  openDetails(movieModel: MovieModel) {
    this.router.navigate(['details', JSON.stringify(movieModel)], {
      state: { data: movieModel }
    })
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(() => {
      const navigation = this.router.getCurrentNavigation();
      if (navigation?.extras.state) {
        this.listModel = navigation.extras.state['data'];
      } else {
        // Fallback: handle data retrieval if not coming from navigation state
        this.listModel = this.route.snapshot.data['data'];
      }
    });
  }

}
