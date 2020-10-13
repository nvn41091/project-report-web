import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {passwordsMatchValidator} from '../../share-lib-module/password-validator';
import {onlyPasswordValidator} from '../../shared/directives/only-characters.directive';
import {ChangePasswordService} from '../../../assets/service/change-password.service';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  resetKey: string;
  submit: boolean = false;

  constructor(private router: Router,
              private fb: FormBuilder,
              private changePasswordService: ChangePasswordService,
              private toastr: CustomToastrService) {
    this.resetKey = this.router.getCurrentNavigation()?.extras.state?.resetKey;
  }

  ngOnInit(): void {
    if (this.resetKey) {
      this.changePassForm.get('oldPassword').clearValidators();
      this.changePassForm.get('oldPassword').setErrors(null);
    }
  }

  changePassForm = this.fb.group({
    oldPassword: new FormControl(null, [Validators.required]),
    passwordHash: new FormControl(null, [Validators.required,
      onlyPasswordValidator(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/)]),
    rePassword: new FormControl(null, []),
    resetKey: new FormControl(this.resetKey, []),
  }, {
    validators: passwordsMatchValidator,
  });

  changePass() {
    this.submit = true;
    this.changePasswordService.resetPassword(this.changePassForm.value).subscribe(
      () => {
        this.toastr.updateSuccess();
      },
      () => {
        this.toastr.unknownError();
        this.submit = false;
      },
    );
  }
}
