import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { MovieData } from '../models/movie-list-model';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<MovieData> {
  constructor(private httpClient: HttpClient) {
    //export mock data
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let id = route.paramMap.get('id');
    return id;
  }
}
