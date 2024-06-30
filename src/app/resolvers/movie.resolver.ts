import { Injectable } from "@angular/core";
import { MovieModel } from "../models/movieModel";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";



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
