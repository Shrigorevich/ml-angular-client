import { Component, OnInit } from '@angular/core';
import { UserLoggedModel } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get user(): UserLoggedModel {
    return this._authService.userData;
  }

  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {}
}
