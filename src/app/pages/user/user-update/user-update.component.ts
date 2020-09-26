import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {User} from '../../../../assets/service/user.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserUpdateComponent implements OnInit {
  data: User;

  constructor(private ref: NbDialogRef<UserUpdateComponent>,
              private fb: FormBuilder,
              private translate: TranslateService) {
  }

  userField: FormGroup;

  ngOnInit(): void {
    this.translate.currentLang;
    this.userFieldInit();
  }

  userFieldInit() {
    this.userField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      userName: new FormControl(this.data?.userName, [Validators.required,
        Validators.maxLength(50), Validators.minLength(6)]),
      fullName: new FormControl(this.data?.fullName, [Validators.required,
        Validators.maxLength(200)]),
      passwordHash: new FormControl(this.data?.passwordHash, []),
      email: new FormControl(this.data?.email, [Validators.required, Validators.maxLength(200)]),
      imageUrl: new FormControl(this.data?.imageUrl, [Validators.maxLength(256)]),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
      langKey: new FormControl(this.data?.langKey, []),
      activationKey: new FormControl(this.data?.activationKey, []),
      resetKey: new FormControl(this.data?.resetKey, []),
      createdBy: new FormControl(this.data?.createdBy, []),
      createDate: new FormControl(this.data?.createDate, []),
      resetDate: new FormControl(this.data?.resetDate, []),
      lastModifiedBy: new FormControl(this.data?.lastModifiedBy, []),
      lastModifiedDate: new FormControl(this.data?.lastModifiedDate, []),
      fingerprint: new FormControl(this.data?.fingerprint, []),
    });
  }

  save() {
  }

  cancel() {
    this.ref.close();
  }

}
