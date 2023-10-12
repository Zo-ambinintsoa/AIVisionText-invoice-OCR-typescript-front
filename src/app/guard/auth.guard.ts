import { Injectable } from '@angular/core';
import {CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private authService: AuthService, private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.authService.getAuthenticatedUser()
        .subscribe(
          (authenticated: boolean) => {
            if (authenticated) {
              resolve(true); // User is authenticated, allow access
            } else {
              this.router.navigate(['/login']); // User is not authenticated, redirect to the login page
              resolve(false);
            }
          },
          (error) => {
            this.router.navigate(['/login']); // An error occurred, redirect to the login page
            resolve(false);
          }
        );
    });
  }
}
