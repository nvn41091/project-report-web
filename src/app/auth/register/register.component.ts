import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthSerivce} from '../../../assets/service/auth.serivce';
import {Router} from '@angular/router';
import {passwordsMatchValidator} from '../../share-lib-module/password-validator';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent implements OnInit {
  messages: string[] = [];
  errors: string[] = [];
  submitted: boolean = false;

  constructor(private translate: TranslateService,
              private fb: FormBuilder,
              private authService: AuthSerivce,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  formRegister = this.fb.group({
    fullName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    userName: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(200)]),
    passwordHash: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
    rePassword: new FormControl(null, []),
  }, {
    validators: passwordsMatchValidator,
  });

  register() {
    this.submitted = true;
    this.messages = [];
    this.errors = [];
    this.authService.register(this.formRegister.value).subscribe(
      (success) => {
        this.submitted = false;
        this.messages.push(this.translate.instant('register.success'));
        setTimeout(() => {
          return this.router.navigateByUrl('/auth/login');
        }, 3000);
      },
      (error) => {
        this.submitted = false;
        this.errors.push(error.error.message);
      },
    );
  }
}
