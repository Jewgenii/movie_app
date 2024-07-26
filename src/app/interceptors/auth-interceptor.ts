import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { CredentialsManagerService } from "../services/credentials-service/credentials-manager.service";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _credentialsManager: CredentialsManagerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const modifiedReq = req.clone({
      setHeaders: { "Authorization": `Bearer ${this._credentialsManager.getUserCredentials().apiAuthToken}` }
    });

    return next.handle(modifiedReq);
  }

}
