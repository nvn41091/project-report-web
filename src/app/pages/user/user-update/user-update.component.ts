import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../../assets/service/user.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserUpdateComponent implements OnInit {
  data: User;
  title: string;

  constructor(private ref: NbDialogRef<UserUpdateComponent>,
              private fb: FormBuilder,
              private translate: TranslateService) {
  }

  userField = this.fb.group({
    userName: new FormControl(null, [Validators.required]),
  });

  ngOnInit(): void {
  }

  save() {
  }

  cancel() {
    this.ref.close();
  }

}
