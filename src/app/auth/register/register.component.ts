import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {AuthSerivce} from '../../../assets/service/auth.serivce';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent implements OnInit {
  messages: string[] = [];
  submitted: boolean = false;

  constructor(private traslate: TranslateService,
              private fb: FormBuilder,
              private authService: AuthSerivce) {
  }

  ngOnInit(): void {
  }

  formRegister = this.fb.group({
    fullName: new FormControl(null, [Validators.required, Validators.maxLength(200)]),
    userName: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    email: new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(200)]),
    passwordHash: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(60)]),
  });

  register() {
    this.submitted = true;
    this.authService.register(this.formRegister.value).subscribe(
      (success) => {
      },
      (error) => {
        this.submitted = false;
      },
    );
  }
}
