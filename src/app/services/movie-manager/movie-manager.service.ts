import { Injectable } from '@angular/core';
import { MovieService } from '../movie-service/movie.service';
import { HttpHeaders } from '@angular/common/http';

import { firstValueFrom } from 'rxjs';
import { UserCredentials } from '../../models/user-credentials';
import { CredentialsManagerService } from '../credentials-service/credentials-manager.service';


@Injectable({
  providedIn: 'root'
})
export class MovieManagerService {
  private _options: any;
  private _userCredentials!: UserCredentials;

  constructor(private _movieService: MovieService,
    private _credentialsManager: CredentialsManagerService
  ) {
  }

  initialize(): void {

    this._userCredentials = this._credentialsManager.getUserCredentials();

    this._options = {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this._userCredentials.apiAuthToken}`
      })
    };

  }

  public getPopular(): Promise<any> {
    let res = this._movieService.getPopular(this._options);
    return firstValueFrom(res);
  }

  tmp() {
    // this._movieService.getPopular().subscribe(res => {

    //   console.log(res)
    // });


    // let token = await this._movieService.getToken(this._api_key);

    // let loginModel: ValidateWithLogin = {
    //   "username": this._userName,
    //   "password": this._userPass,
    //   "request_token": token.request_token
    // }

    // let validResult = await this._movieService.validateWithLogin(this._api_key, loginModel);
    // let session = await this._movieService.postSession(this._api_key, token.request_token);
  }
}
