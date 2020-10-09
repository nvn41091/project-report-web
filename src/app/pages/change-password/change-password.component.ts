import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {passwordsMatchValidator} from '../../share-lib-module/password-validator';
import {onlyPasswordValidator} from '../../shared/directives/only-characters.directive';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  isRequestPassword: boolean;
  submit: boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder) {
    this.isRequestPassword = this.router.getCurrentNavigation()?.extras.state?.request ?
      this.router.getCurrentNavigation()?.extras.state?.request : false;
  }

  ngOnInit(): void {
    if (this.isRequestPassword === true) {
      this.changePassForm.get('oldPassword').clearValidators();
      this.changePassForm.get('oldPassword').setErrors(null);
    }
  }

  changePassForm = this.fb.group({
    oldPassword: new FormControl(null, [Validators.required]),
    passwordHash: new FormControl(null, [Validators.required,
      onlyPasswordValidator(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/)]),
    rePassword: new FormControl(null, []),
  }, {
    validators: passwordsMatchValidator,
  });

  changePass() {
    this.submit = true;
    if (this.isRequestPassword) {
    } else {
    }
  }
}
