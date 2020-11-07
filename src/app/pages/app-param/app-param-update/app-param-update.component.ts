import {Component, OnInit} from '@angular/core';
import {AppParam, AppParamService} from '../../../../assets/service/app-param.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {onlyCharacterValidator} from '../../../shared/directives/only-characters.directive';
import {debounceTime, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {numberValidator} from '../../../shared/directives/custome-number.directive';

@Component({
  selector: 'ngx-app-param-update',
  templateUrl: './app-param-update.component.html',
  styleUrls: ['./app-param-update.component.scss']
})
export class AppParamUpdateComponent implements OnInit {
  data: AppParam;
  loading: boolean = false;
  types: string[] = [];
  appParamField: FormGroup;

  constructor(private ref: NbDialogRef<AppParamUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private appParamService: AppParamService) {
    this.translate.currentLang;
  }

  ngOnInit(): void {
    this.userFieldInit();
    this.appParamField.get('type').valueChanges.pipe(
      debounceTime(1000),
      switchMap((value: string) => {
        return this.autoCompleteType(value);
      })
    ).subscribe(value => this.types = value.body);
  }

  autoCompleteFocus() {
    this.autoCompleteType('').subscribe(res => this.types = res.body);
  }
  autoCompleteType(type: string) {
    return this.appParamService.autoCompleteType({
      type: type
    });
  }

  userFieldInit() {
    this.appParamField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(500)]),
      type: new FormControl(this.data?.type, [Validators.required, Validators.maxLength(200), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      value: new FormControl(this.data?.value, [Validators.required, Validators.maxLength(500)]),
      updateTime: new FormControl(this.data?.updateTime),
      ord: new FormControl(this.data?.ord, [numberValidator(/\d+/)]),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
    });
  }

  save() {
    this.loading = true;
    const company = Object.assign({}, this.appParamField.value);
    if (company.id) {
      this.appParamService.update(company).subscribe(res => {
        this.toastr.success('common.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.appParamService.insert(company).subscribe(res => {
        this.toastr.success('common.label.insert_success', true);
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
