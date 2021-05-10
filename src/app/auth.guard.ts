import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, Route } from '@angular/router';
import { relative } from 'path';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';
import { Role } from './manager/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dataService: ApiService,private router: Router, private authService: AuthService ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {

        this.router.navigate(['login']);
        return false;
    }


    const roles = route.data.roles as Role[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
        this.router.navigate(['error', 'not-found']);
        return false;
    }
    return true;
}
canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthorized()) {
        return false;
    }
    const roles = route.data && route.data.roles as Role[];
    if (roles && !roles.some(r => this.authService.hasRole(r))) {
        return false;
    }
    return true;
}

  isLogin(routeurl: string): any {
    if (this.dataService.isLoggedIn()) {
    return true;
    }

    this.dataService.redirectUrl = routeurl;
    this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    }

}
