import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { UserRegisterModel } from '../models';
import { Token } from '../models/token.model';
import { UserLoggedModel } from '../models/user-logged.model';
import { UserLoginModel } from '../models/user-login.model';
import { RequestService } from './request.service';

export const ACCESS_TOKEN_KEY = 'token';

@Injectable()
export class AuthService {

  private _userData: UserLoggedModel = { nickname: '', paid: false };

  get userData(): UserLoggedModel {
    return this._userData;
  }

  constructor(
    private readonly _router: Router,
    private readonly _requestService: RequestService,
    private readonly _jwtHelper: JwtHelperService,
    private readonly _httpClient: HttpClient,
  ) {}

  public setUserData(): void {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      const decodedToken = this._jwtHelper.decodeToken(token);
      this._userData.nickname = decodedToken.nickname;
      this._userData.paid = decodedToken.paid;
    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return token ? !this._jwtHelper.isTokenExpired(token) : false;
  }

  public login(user: UserLoginModel): Observable<Token> {
    return this._requestService.post<Token>('api/auth', user);
  }

  public register(user: UserRegisterModel): Observable<Token> {
    return this._requestService.post<Token>('api/users', user);
  }

  public logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this._router.navigate(['/']);
  }
  
  public getIpAdress(): Observable<string> {
    return this._httpClient.get<any>('http://api.ipify.org/?format=json').pipe(map((res: any) => {
      return res.ip;
    }));
  }
}
