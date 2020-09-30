import { Component, OnInit } from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';
import { ModuleService, Module } from 'assets/service/module.service';

@Component({
  selector: 'ngx-module-update',
  templateUrl: './module-update.component.html',
  styleUrls: ['./module-update.component.scss'],
})
export class ModuleUpdateComponent implements OnInit {
  data: Module;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<ModuleUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private moduleService: ModuleService) {
    this.translate.currentLang;
  }

  moduleField: FormGroup;

  ngOnInit(): void {
    this.translate.currentLang;
    this.userFieldInit();
  }

  userFieldInit() {
    this.moduleField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required, Validators.maxLength(100), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      pathUrl: new FormControl(this.data?.pathUrl, [Validators.maxLength(200)]),
      icon: new FormControl(this.data?.icon, [Validators.maxLength(150)]),
      parentId: new FormControl(this.data?.parentId, []),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
      isGroup: new FormControl(!this.data?.parentId),
    });
  }

  save() {
    this.loading = true;
    const module = Object.assign({}, this.moduleField.value);
    if (module.id) {
      this.moduleService.update(module).subscribe(res => {
        this.toastr.success('module.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.moduleService.insert(module).subscribe(res => {
        this.toastr.success('module.label.insert_success', true);
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
