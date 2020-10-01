import { Component, OnInit } from '@angular/core';
import {Role, RoleService} from '../../../../assets/service/role.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';

@Component({
  selector: 'ngx-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent implements OnInit {
  data: Role;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<RoleUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private roleService: RoleService) {
  }

  roleField: FormGroup;

  ngOnInit(): void {
    this.translate.currentLang;
    this.userFieldInit();
  }

  userFieldInit() {
    this.roleField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required, Validators.maxLength(100), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
    });
  }

  save() {
    this.loading = true;
    const company = Object.assign({}, this.roleField.value);
    if (company.id) {
      this.roleService.update(company).subscribe(res => {
        this.toastr.success('role.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.roleService.insert(company).subscribe(res => {
        this.toastr.success('role.label.insert_success', true);
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
