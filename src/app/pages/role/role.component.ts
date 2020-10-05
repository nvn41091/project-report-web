import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {HttpHeaders} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import { RoleService, Role } from 'assets/service/role.service';
import {RoleUpdateComponent} from './role-update/role-update.component';
import {RoleModuleComponent} from './role-module/role-module.component';
import {NbAccessChecker} from '@nebular/security';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit {
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
    {name: 'role.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'role.column.code', prop: 'code', flexGrow: 0.7, minWidth: 70},
    {name: 'role.column.name', prop: 'name', flexGrow: 1, minWidth: 100},
    {name: 'role.column.update_time', prop: 'updateTime', flexGrow: 1, minWidth: 100},
    {name: 'role.column.status', prop: 'status', flexGrow: 0.9, minWidth: 90},
    {name: 'role.column.action', prop: 'action_btn', flexGrow: 0.6, minWidth: 60},
  ];
  lstStatus = [
    {value: null, name: 'common.status.clean'},
    {value: true, name: 'common.status.true'},
    {value: false, name: 'common.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private roleService: RoleService,
              private fb: FormBuilder,
              private dialog: NbDialogService,
              private toastr: CustomToastrService,
              private accessChecker: NbAccessChecker) {
    this.themeService.onThemeChange().subscribe((theme: any) => { this.theme = theme.name; });
  }

  ngOnInit(): void {
    this.authorSearch().then(r => {});
    this.search();
  }

  async authorSearch() {
    await this.accessChecker.isGranted('access', 'ROLE#SEARCH').subscribe(grand => this.grandSearch = grand);
  }

  formSearch = this.fb.group({
    code: new FormControl(null),
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
    if (this.grandSearch) {
      this.loading = true;
      this.roleService.doSearch(this.dataSearch, {
        page: pageToLoad,
        size: this.page.limit,
      }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad),
        err => this.loading = false);
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
    this.dialog.open(RoleUpdateComponent, {
      context: {
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      res?.result === 'complete' ? this.setPage({offset: 0}) : {};
    });
  }

  delete(data: Role) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('role.label.delete'),
        message: this.translate.instant('role.label.message_delete') + ' ' + data.name + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.roleService.delete(data).subscribe((success) => {
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

  openMapRole(role: Role) {
    this.dialog.open(RoleModuleComponent, {
      context: {
        role: role,
      },
    });
  }
}
