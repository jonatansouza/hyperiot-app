import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private loginProvider: LoginService) {

  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
      if (this.loginProvider.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['/login', {loginState: state.url}]);
      return false;
  }
}