import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRegisterModel } from '../../models';
import { ACCESS_TOKEN_KEY, AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public currentForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _authService: AuthService,
    private readonly _router: Router
  ) {
    this.currentForm = this._createForm();
  }

  ngOnInit(): void {}

  private _createForm(): FormGroup {
    const form = this._fb.group({
      email: [],
      nickname: [],
      password: [],
    });

    return form;
  }

  public register(user: UserRegisterModel) {
    this._authService.register(user).subscribe(
      (response) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, response.access_token);
        this._authService.setUserData();
      },
      (error) => {
        alert(error.error.msg);
      }
    );
  }

  public onSubmit() {
    this.register(this.currentForm.value);
  }
}
