import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {Company, CompanyService} from 'assets/service/company.service';
import {CompanyUpdateComponent} from './company-update/company-update.component';

@Component({
  selector: 'ngx-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent implements OnInit {
  theme;
  loading = false;
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'company.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'company.column.code', prop: 'code', flexGrow: 0.7, minWidth: 70},
    {name: 'company.column.name', prop: 'name', flexGrow: 1, minWidth: 100},
    {name: 'company.column.tel', prop: 'tel', flexGrow: 1, minWidth: 100},
    {name: 'company.column.email', prop: 'email', flexGrow: 1, minWidth: 100},
    {name: 'company.column.updateTime', prop: 'updateTime', flexGrow: 1, minWidth: 100},
    {name: 'company.column.status', prop: 'status', flexGrow: 0.9, minWidth: 90},
    {name: 'company.column.action', prop: 'action_btn', flexGrow: 0.6, minWidth: 60},
  ];
  lstStatus = [
    {value: null, name: 'common.status.clean'},
    {value: true, name: 'common.status.true'},
    {value: false, name: 'common.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private companyService: CompanyService,
              private fb: FormBuilder,
              private dialog: NbDialogService,
              private toastr: CustomToastrService) {
    this.themeService.onThemeChange().subscribe((theme: any) => { this.theme = theme.name; });
  }

  ngOnInit(): void {
    this.search();
  }

  formSearch = this.fb.group({
    code: new FormControl(null),
    name: new FormControl(null),
    email: new FormControl(null),
    tel: new FormControl(null),
    status: new FormControl(null),
  });

  search() {
    if (!this.loading) {
      this.dataSearch = this.formSearch.value;
      this.setPage({offset: 0});
    }
  }

  setPage(pageInfo) {
    this.loading = true;
    const pageToLoad: number = pageInfo.offset;
    this.companyService.doSearch(this.dataSearch, {
      page: pageToLoad,
      size: this.page.limit,
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad),
      err => this.loading = false);
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
    this.dialog.open(CompanyUpdateComponent, {
      context: {
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      res?.result === 'complete' ? this.setPage({offset: 0}) : {};
    });
  }

  delete(data: Company) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('company.label.delete'),
        message: this.translate.instant('company.label.message_delete') + ' ' + data.name + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.companyService.delete(data).subscribe((success) => {
            this.toastr.success('company.label.delete_success', true);
            this.setPage({offset: 0});
          },
          (error) => {
            this.loading = false;
            this.toastr.unknownError();
          });
      }
    });
  }
}
