import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieCardOpenerService {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  public openCard(id: number) {
    this.router.navigate(['movieCard', id], { relativeTo: this.route });
  }
}
