import { Injectable } from '@angular/core';
import { GenericDataService } from '../generic-data.service';
import { MovieInterface } from '../../interfaces/movie-interface';
import { Observable } from 'rxjs';
import { UrlEnums} from  '../enums/urls-enums';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  private _baseUrl: string = "";

  constructor(private _service: GenericDataService<MovieInterface>) {
  }

  get(id: string): Observable<MovieInterface> {
    return this._service.get(`${this._baseUrl}/${UrlEnums.GET}/${id}`);
  }

  getMany(): Observable<MovieInterface[]> {
    return this._service.getMany(`${this._baseUrl}/${UrlEnums.GET_MANY}`);
  }

  post(item: MovieInterface): Observable<MovieInterface> {
    return this._service.post(item, `${this._baseUrl}/${UrlEnums.POST}`);
  }

  put(item: MovieInterface): Observable<MovieInterface> {
    return this._service.put(item, `${this._baseUrl}/${UrlEnums.PUT}`);
  }

  delete(id: string): Observable<MovieInterface> {
    return this._service.delete(id, `${this._baseUrl}/${UrlEnums.DELETE}`);
  }



}
