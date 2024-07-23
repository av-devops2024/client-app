import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UnauthorizedGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    throw new Error('Method not implemented.');
  }
  // constructor(public authService: AuthService, public router: Router) {}

  // canActivate(): boolean {
    // if (this.authService.getLoggedParsedUser()){
    //   this.router.navigate(["/offers"]);

    //   return false;
    // }

    // return true;
  // }
}
