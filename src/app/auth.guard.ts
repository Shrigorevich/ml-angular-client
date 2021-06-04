import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly _authService: AuthService,
    private readonly _router: Router,
  ) { }

  public canActivate(): boolean {
    if (!this._authService.isAuthenticated()) {
      this._router.navigateByUrl('/');
    }

    return true
  }

}
