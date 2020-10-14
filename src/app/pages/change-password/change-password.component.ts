import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {passwordsMatchValidator} from '../../share-lib-module/password-validator';
import {onlyPasswordValidator} from '../../shared/directives/only-characters.directive';
import {ChangePasswordService} from '../../../assets/service/change-password.service';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordComponent implements OnInit {
  resetKey: string;
  submit: boolean = false;
  success: string[] = [];
  errors: string[] = [];

  constructor(private router: Router,
              private fb: FormBuilder,
              private changePasswordService: ChangePasswordService,
              private toastr: CustomToastrService,
              private cd: ChangeDetectorRef,
              private translate: TranslateService) {
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
    resetKey: new FormControl(null, []),
  }, {
    validators: passwordsMatchValidator,
  });

  changePass() {
    this.submit = true;
    this.success = [];
    this.errors = [];
    this.changePassForm.get('resetKey').setValue(this.resetKey);
    this.changePasswordService.resetPassword(this.changePassForm.value).subscribe(
      () => {
        this.success.push(this.translate.instant('change_password.success'));
        this.cd.detectChanges();
        setTimeout(() => {
          return this.router.navigateByUrl('/pages/home');
        }, 3000);
      },
      (error) => {
        this.errors.push(error.error.title);
        this.submit = false;
        this.cd.detectChanges();
      },
    );
  }
}
