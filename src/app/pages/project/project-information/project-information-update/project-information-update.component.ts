import { Component, OnInit } from '@angular/core';
import {ProjectInformation} from '../../../../../assets/service/project-information.service';
import {CompanyService} from '../../../../../assets/service/company.service';
import {NbDialogRef} from '@nebular/theme';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomToastrService} from '../../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {onlyCharacterValidator} from '../../../../shared/directives/only-characters.directive';
import {AppParam} from '../../../../../assets/service/app-param.service';

@Component({
  selector: 'ngx-project-information-update',
  templateUrl: './project-information-update.component.html',
  styleUrls: ['./project-information-update.component.scss']
})
export class ProjectInformationUpdateComponent implements OnInit {
  data: ProjectInformation;
  loading: boolean = false;
  lstStatus: AppParam[];

  constructor(private ref: NbDialogRef<ProjectInformationUpdateComponent>,
              private fb: FormBuilder,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private companyService: CompanyService) {
  }

  infoField: FormGroup;

  ngOnInit(): void {
    this.userFieldInit();
  }

  userFieldInit() {
    const date = {
      start: this.data?.startDate ? new Date(this.data.startDate) : undefined,
      end: this.data?.actualEndTime ? new Date(this.data.actualEndTime) : undefined,
    };
    this.infoField = this.fb.group({
      id: new FormControl(this.data?.id, []),
      code: new FormControl(this.data?.code, [Validators.required, Validators.maxLength(100), onlyCharacterValidator(/^[A-Za-z0-9_]+$/)]),
      name: new FormControl(this.data?.name, [Validators.required, Validators.maxLength(250)]),
      date: new FormControl(date, []),
      endDatePlan: new FormControl(this.data?.endDatePlan ? new Date(this.data?.endDatePlan) : undefined, []),
      money: new FormControl(this.data?.money, []),
      endPlan: new FormControl(this.data?.endDatePlan ? new Date(this.data?.endDatePlan) : undefined, []),
      customerId: new FormControl(this.data?.customerId, []),
      companyId: new FormControl(this.data?.companyId, []),
      description: new FormControl(this.data?.description, [Validators.maxLength(500)]),
      status: new FormControl(this.data?.status, [Validators.required]),
    });
  }

  save() {
    this.loading = true;
    const company = Object.assign({}, this.infoField.value);
    if (company.id) {
      this.companyService.update(company).subscribe(res => {
        this.toastr.success('common.label.update_success', true);
        this.ref.close({result: 'complete'});
      }, err => {
        this.loading = false;
        this.toastr.error(err.error.title);
      });
    } else {
      this.companyService.insert(company).subscribe(res => {
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
