import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-request-password',
  templateUrl: './request-password.component.html',
  styleUrls: ['./request-password.component.scss'],
})
export class RequestPasswordComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private translate: TranslateService) {
    this.translate.currentLang;
  }

  ngOnInit(): void {
  }

  requestPassword() {
  }

  rqForm = this.fb.group({
    email: new FormControl(null, [Validators.email, Validators.required])
  });
}
