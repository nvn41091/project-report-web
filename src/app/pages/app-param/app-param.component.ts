import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {NbAccessChecker} from '@nebular/security';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {AppParam, AppParamService} from '../../../assets/service/app-param.service';
import {AppParamUpdateComponent} from './app-param-update/app-param-update.component';
import {debounceTime, delay, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'ngx-app-param',
  templateUrl: './app-param.component.html',
  styleUrls: ['./app-param.component.scss']
})
export class AppParamComponent implements OnInit {
  theme;
  loading = false;
  grand: boolean = false;
  rows: Object[];
  types: any = [];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'app_param.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'app_param.column.name', prop: 'name', flexGrow: 0.9, minWidth: 90},
    {name: 'app_param.column.type', prop: 'type', flexGrow: 0.7, minWidth: 70},
    {name: 'app_param.column.value', prop: 'value', flexGrow: 1.3, minWidth: 130},
    {name: 'app_param.column.update_time', prop: 'updateTime', flexGrow: 0.8, minWidth: 80},
    {name: 'app_param.column.status', prop: 'status', flexGrow: 0.6, minWidth: 60},
    {name: 'app_param.column.action_btn', prop: 'action_btn', flexGrow: 0.6, minWidth: 60},
  ];
  lstStatus = [
    {value: null, name: 'common.status.clean'},
    {value: true, name: 'common.status.true'},
    {value: false, name: 'common.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private appParamService: AppParamService,
              private fb: FormBuilder,
              private dialog: NbDialogService,
              private toastr: CustomToastrService,
              private accessChecker: NbAccessChecker) {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  autoFocus() {
    this.autoCompleteType(null).subscribe(res => this.types = res.body);
  }

  ngOnInit(): void {
    this.author().then(() => {});
    this.search();
    this.formSearch.get('type').valueChanges.pipe(
      debounceTime(1000),
      switchMap((value: string) => {
        return this.autoCompleteType(value);
      })
    ).subscribe(value => this.types = value.body);
  }

  autoCompleteType(type: string) {
    return this.appParamService.autoCompleteType({
      type: type
    });
  }

  async author() {
    await this.accessChecker.isGranted('access', 'PARAM#SEARCH').subscribe(grand => this.grand = grand);
  }


  formSearch = this.fb.group({
    type: new FormControl(null),
    name: new FormControl(null),
    status: new FormControl(null),
  });

  search() {
    if (!this.loading) {
      this.dataSearch = this.formSearch.value;
      this.setPage({offset: 0});
    }
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    if (this.grand) {
      this.loading = true;
      this.appParamService.doSearch(this.dataSearch, {
        page: pageToLoad,
        size: this.page.limit,
      }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.loading = false);
    }
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = Number(headers.get('X-Total-Count'));
    this.page.offset = page || 0;
    this.rows = data || [];
    this.loading = false;
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number, page?: number }) {
    this.setPage(pageInfo);
  }

  edit(data) {
    this.dialog.open(AppParamUpdateComponent, {
      context: {
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      res?.result === 'complete' ? this.setPage({offset: 0}) : {};
    });
  }

  delete(data: AppParam) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('app_param.label.delete'),
        message: this.translate.instant('app_param.label.message_delete') + ' ' + data.name + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.appParamService.delete(data).subscribe(() => {
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
