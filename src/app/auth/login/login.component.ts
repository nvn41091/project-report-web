import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbAuthJWTToken, NbTokenService} from '@nebular/auth';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthSerivce} from '../../../assets/service/auth.serivce';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxLoginComponent implements OnInit {

  redirectDelay: number = 3000;

  errors: string[] = [];
  messages: string[] = [];
  submitted: boolean = false;
  rememberMe = false;
  loginForm: FormGroup;

  constructor(private service: AuthSerivce,
              private jwtService: NbTokenService,
              protected cd: ChangeDetectorRef,
              protected router: Router) {
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null),
      passwordHash: new FormControl(null),
    });
  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;
    this.service.login(this.loginForm.value).subscribe((result: HttpResponse<any>) => {
        this.submitted = false;
        this.messages.push('Đăng nhập thành công');
        this.jwtService.set(new NbAuthJWTToken(result.headers.get('Authorization'), result.body.username));
        this.cd.detectChanges();
        const redirect = '/pages/iot-dashboard';
        if (redirect) {
          setTimeout(() => {
            return this.router.navigateByUrl(redirect);
          }, this.redirectDelay);
        }
      },
      (error) => {
        this.errors.push('Tài khoản hoặc mật khẩu không đúng');
        this.submitted = false;
        this.cd.detectChanges();
      },
    );
  }
}
