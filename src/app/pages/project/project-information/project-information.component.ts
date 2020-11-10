import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {NbAccessChecker} from '@nebular/security';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {AppParam, AppParamService} from '../../../../assets/service/app-param.service';
import {ProjectInformation, ProjectInformationService} from '../../../../assets/service/project-information.service';
import {ProjectInformationUpdateComponent} from './project-information-update/project-information-update.component';

@Component({
  selector: 'ngx-project-information',
  templateUrl: './project-information.component.html',
  styleUrls: ['./project-information.component.scss'],
})
export class ProjectInformationComponent implements OnInit {
  theme;
  loading = false;
  rows: Object[];
  grandSearch: boolean = false;
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'prj-information.column.index', prop: 'index', flexGrow: 0.2, minWidth: 20},
    {name: 'prj-information.column.code', prop: 'code', flexGrow: 0.5, minWidth: 50},
    {name: 'prj-information.column.name', prop: 'name', flexGrow: 1.0, minWidth: 100},
    {name: 'prj-information.column.money', prop: 'money', flexGrow: 0.6, minWidth: 60},
    {name: 'prj-information.column.start_date', prop: 'startDate', flexGrow: 0.6, minWidth: 60},
    {name: 'prj-information.column.end_date_plan', prop: 'endDatePlan', flexGrow: 0.6, minWidth: 60},
    {name: 'prj-information.column.actual_end_time', prop: 'actualEndTime', flexGrow: 0.6, minWidth: 60},
    {name: 'prj-information.column.status', prop: 'statusValue', flexGrow: 0.5, minWidth: 50},
    {name: 'prj-information.column.action', prop: 'action_btn', flexGrow: 0.6, minWidth: 60},
  ];
  lstStatus: AppParam[] = [
    {id: null, value: 'common.status.clean'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private projectInformationService: ProjectInformationService,
              private fb: FormBuilder,
              private appParamService: AppParamService,
              private dialog: NbDialogService,
              private toastr: CustomToastrService,
              private accessChecker: NbAccessChecker) {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  ngOnInit(): void {
    this.authorSearch().then(() => {
    });
    this.appParamService.getValueByType('TYPE_STATUS')
      .subscribe(res => Array.prototype.push.apply(this.lstStatus, res.body));
    this.search();
  }

  async authorSearch() {
    await this.accessChecker.isGranted('access', 'PRI#SEARCH').subscribe(grand => this.grandSearch = grand);
  }

  formSearch = this.fb.group({
    code: new FormControl(null),
    name: new FormControl(null),
    status: new FormControl(null),
    start: new FormControl(null),
    parentId: new FormControl(null),
    endPlan: new FormControl(null),
    endTime: new FormControl(null),
    date: new FormControl(null),
  });

  search() {
    if (!this.loading) {
      const date = this.formSearch.get('date').value;
      this.formSearch.get('start').setValue(date?.start);
      this.formSearch.get('endTime').setValue(date?.end);
      this.dataSearch = this.formSearch.value;
      // this.dataSearch.startDate = formatDate(this.dataSearch.startDate);
      // this.dataSearch.endDatePlan = formatDate(this.dataSearch.endDatePlan);
      // this.dataSearch.actualEndTime = formatDate(this.dataSearch.actualEndTime);
      this.setPage({offset: 0});
    }
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    if (this.grandSearch) {
      this.loading = true;
      this.projectInformationService.doSearch(this.dataSearch, {
        page: pageToLoad,
        size: this.page.limit,
      }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.loading = false);
    }
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.length;
    this.page.offset = page || 0;
    this.rows = data || [];
    this.loading = false;
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number, page?: number }) {
    this.setPage(pageInfo);
  }

  edit(data) {
    this.dialog.open(ProjectInformationUpdateComponent, {
      context: {
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      res?.result === 'complete' ? this.setPage({offset: 0}) : {};
    });
  }

  delete(data: ProjectInformation) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('module.label.delete'),
        message: this.translate.instant('module.label.message_delete') + ' ' + data.name + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.projectInformationService.delete(data).subscribe(() => {
            this.toastr.success('common.label.delete_success', true);
            this.setPage({offset: 0});
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.title);
          });
      }
    });
  }
}
