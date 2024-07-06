import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { MovieModel } from "../models/movie-list-model";



@Injectable({ providedIn: 'root' })
export class MovieResolver implements Resolve<MovieModel> {


  constructor(private httpClient: HttpClient) {

    //export mock data

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {

    let id = route.paramMap.get('id');
    return id;
  }

}
