import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class MovieGuard implements CanActivate {
  public canActivate(): boolean {
    return true;
  }

}
