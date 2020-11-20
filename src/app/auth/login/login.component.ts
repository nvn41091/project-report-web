import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthSerivce} from '../../../assets/service/auth.serivce';
import {HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {

  redirectDelay: number = 500;

  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  rememberMe = false;
  loginForm: FormGroup;

  constructor(private service: AuthSerivce,
              private translate: TranslateService,
              private jwtService: NbTokenService,
              private store: LocalStorageService,
              protected cd: ChangeDetectorRef,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      passwordHash: new FormControl(null, [Validators.required]),
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.login(this.loginForm.value).subscribe((result: HttpResponse<any>) => {
        this.messages.push(this.translate.instant('login.success'));
        this.store.store('token', result.body);
        this.jwtService.set(new NbAuthJWTToken(result.body[0].token, 'token'));
        this.cd.detectChanges();
        const redirect = environment.homePage;
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
      },
      () => {
        this.errors.push(this.translate.instant('login.login-fail'));
        this.submitted = false;
        this.cd.detectChanges();
      },
    );
  }
}
