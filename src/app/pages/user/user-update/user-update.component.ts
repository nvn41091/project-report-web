import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../../../../assets/service/user.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';

@Component({
  selector: 'ngx-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
  data: User;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<UserUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private userService: UserService) {
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
        Validators.maxLength(50), Validators.minLength(6), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      fullName: new FormControl(this.data?.fullName, [Validators.required,
        Validators.maxLength(200)]),
      passwordHash: new FormControl(this.data?.passwordHash, []),
      email: new FormControl(this.data?.email, [Validators.required, Validators.maxLength(200), Validators.email]),
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
    this.loading = true;
    const user = Object.assign({}, this.userField.value);
    if (user.id) {
      this.userService.update(user).subscribe(res => {
        this.toastr.success('user.update_complete', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.userService.insert(user).subscribe(res => {
        this.toastr.success('user.insert_complete', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    }
  }

  cancel() {
    this.ref.close();
  }

}
