import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLoginModel } from 'src/app/shared/models';
import { Token } from 'src/app/shared/models/token.model';
import {
  ACCESS_TOKEN_KEY,
  AuthService,
} from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {

  public get isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }

  constructor(private readonly _authService: AuthService) { }

  ngOnInit(): void {
    this._authService.getIpAdress().subscribe((response) => {
      console.log("Response: " + response);
    });
  }

  public logOut() {
    this._authService.logout();
  }
}
