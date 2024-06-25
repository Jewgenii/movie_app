import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieNavigationService {

  constructor(public _router: Router,
    public _route: ActivatedRoute) { }

  public openCard(id: number) {
    this._router.navigate(['movieCard', id], { relativeTo: this._route });
  }

  public navigateToContainerOutlet(route: ActivatedRoute, routeName: string) {
    this._router.navigate([{ outlets: { 'container-outlet': routeName }, }], { relativeTo: route })
      .then(this.handleNavigationResult);
  }

  private handleNavigationResult(e: boolean): void {
    if (e) {
      console.log('Navigation is successful!');
    } else {
      console.log('Navigation has failed!');
    }
  }
}
