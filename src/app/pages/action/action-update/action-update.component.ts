import { Component, OnInit } from '@angular/core';
import {Action, ActionService} from '../../../../assets/service/action.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';

@Component({
  selector: 'ngx-action-update',
  templateUrl: './action-update.component.html',
  styleUrls: ['./action-update.component.scss'],
})
export class ActionUpdateComponent implements OnInit {
  data: Action;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<ActionUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private actionService: ActionService) {
  }

  actionField: FormGroup;

  ngOnInit(): void {
    this.translate.currentLang;
    this.userFieldInit();
  }

  userFieldInit() {
    this.actionField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required, Validators.maxLength(100), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(250)]),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
    });
  }

  save() {
    this.loading = true;
    const company = Object.assign({}, this.actionField.value);
    if (company.id) {
      this.actionService.update(company).subscribe(res => {
        this.toastr.success('action.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.actionService.insert(company).subscribe(res => {
        this.toastr.success('action.label.insert_success', true);
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
