import { Component, OnInit } from '@angular/core';
import {Company, CompanyService} from '../../../../assets/service/company.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss'],
})
export class CompanyUpdateComponent implements OnInit {
  data: Company;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<CompanyUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private companyService: CompanyService) {
  }

  companyField: FormGroup;

  ngOnInit(): void {
    this.translate.currentLang;
    this.userFieldInit();
  }

  userFieldInit() {
    this.companyField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required, Validators.maxLength(100)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(250)]),
      tel: new FormControl(this.data?.tel, [Validators.maxLength(30)]),
      email: new FormControl(this.data?.email, [Validators.maxLength(200), Validators.email]),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      status: new FormControl(this.data?.status ? this.data?.status : false, [Validators.required]),
    });
  }

  save() {
    this.loading = true;
    const company = Object.assign({}, this.companyField.value);
    if (company.id) {
      this.companyService.update(company).subscribe(res => {
        this.toastr.success('company.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.companyService.insert(company).subscribe(res => {
        this.toastr.success('company.label.insert_success', true);
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
