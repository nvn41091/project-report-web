import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {RequestPasswordService} from '../../../assets/service/request-password.service';
import {NbStepperComponent} from '@nebular/theme';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestPasswordComponent implements OnInit {
  submitted = false;
  errors: string[] = [];
  success: string[] = [];
  @ViewChild('stepper') stepper: NbStepperComponent;

  constructor(private fb: FormBuilder,
              private translate: TranslateService,
              private requestPasswordService: RequestPasswordService,
              private cd: ChangeDetectorRef,
              private jwtService: NbTokenService,
              private router: Router) {
    this.translate.currentLang;
  }

  ngOnInit(): void {
  }

  requestEmail() {
    this.errors = [];
    this.submitted = true;
    this.requestPasswordService.requestEmail(this.rqForm.value).subscribe(
      () => {
        this.success.push(this.translate.instant('request_password.send_mail_success'));
        this.stepper.next();
        this.cd.detectChanges();
      },
      (error) => {
        this.submitted = false;
        this.errors.push(error.error.title);
        this.cd.detectChanges();
      },
    );
  }

  requestPassword() {
    this.errors = [];
    this.success = [];
    this.requestPasswordService.requestPassword({
      email: this.rqForm.get('email').value,
      resetKey: this.resetKeyForm.get('resetKey').value,
    }).subscribe(
      (result) => {
        this.success.push(this.translate.instant('request_password.reset_password_success'));
        this.jwtService.set(new NbAuthJWTToken(result.headers.get('Authorization'), result.body.username));
        this.cd.detectChanges();
        setTimeout(() => {
          return this.router.navigateByUrl('/pages/change-password', {
            state: { resetKey: this.resetKeyForm.get('resetKey').value },
          });
        }, 3000);
      },
      (error) => {
        this.errors.push(error.error.title);
        this.cd.detectChanges();
      }
    );
  }

  rqForm = this.fb.group({
    email: new FormControl(null, [Validators.email, Validators.required])
  });

  resetKeyForm = this.fb.group({
    resetKey: new FormControl(null, [Validators.required])
  });
}
