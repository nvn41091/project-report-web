import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
})
export class NgxRegisterComponent implements OnInit {
  messages: string[] = [];
  submitted: boolean = false;

  constructor(private traslate: TranslateService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  formRegister = this.fb.group({
    fullname: new FormControl(null, []),
    username: new FormControl(null, []),
  });

  register() {
  }
}
