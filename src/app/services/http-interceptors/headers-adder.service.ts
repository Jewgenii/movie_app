import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CredentialsManagerService } from '../credentials-service/credentials-manager.service';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';

@Injectable()
export class HeadersAdderService implements HttpInterceptor {

  constructor(private _credentialsManager: CredentialsManagerService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has("x-auth-interceptor")) {
      req.headers.append("Authorization", this._credentialsManager.getUserCredentials().apiAuthToken);
    }

    return next.handle(req);
  }
}
