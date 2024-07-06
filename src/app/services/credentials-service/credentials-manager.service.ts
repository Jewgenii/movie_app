import { Injectable } from '@angular/core';
import { UserCredentials } from '../../models/user-credentials';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CredentialsManagerService {

  private readonly _env!: UserCredentials;

  constructor() {
    this._env = environment as UserCredentials;
  }

  public getUserCredentials(): UserCredentials {
    return this._env;
  }
}
