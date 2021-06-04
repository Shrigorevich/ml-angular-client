import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ml-angular-client';

  constructor(private readonly _authService: AuthService) {}

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._authService.setUserData();
    }
  }
}
