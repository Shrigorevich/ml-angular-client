import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from '../../models';
import { ACCESS_TOKEN_KEY, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  public currentForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.currentForm = this._createForm();
  }

  ngOnInit(): void { }

  private _createForm(): FormGroup {
    const form = this._fb.group({
      nickname: [],
      password: [],
    });

    return form;
  }

  public login(user: UserLoginModel) {
    this._authService.getIpAdress().subscribe(ip => {
      user.ip = ip;
      this._authService.login(user).subscribe(
        (response) => {
          localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
          this._authService.setUserData();
        },
        (error) => {
          alert(error.error.msg);
        }
      );
    });
  }

  public onSubmit() {
    this.login(this.currentForm.value);
  }
}
