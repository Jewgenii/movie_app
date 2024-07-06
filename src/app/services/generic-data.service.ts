import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenericDataService {

  constructor(protected _httpClient: HttpClient) { }

  public get<DataType>(url: string): Observable<DataType> {
    return this._httpClient.get<DataType>(`${url}`);
  }

  public getMany<DataType>(url: string): Observable<DataType[]> {
    return this._httpClient.get<DataType[]>(url);
  }

  public post<DataType>(item: DataType, url: string): Observable<DataType> {
    return this._httpClient.post<DataType>(url, item);
  }

  public postMany<DataType>(items: DataType[], url: string): Observable<DataType[]> {
    return this._httpClient.post<DataType[]>(url, items);
  }

  public put<DataType>(item: DataType, url: string): Observable<DataType> {
    return this._httpClient.put<DataType>(url, item);
  }

  public delete<DataType>(id: string, url: string): Observable<DataType> {
    return this._httpClient.delete<DataType>(`${url}/${id}`);
  }
}
