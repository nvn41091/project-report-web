import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {Module, ModuleService} from 'assets/service/module.service';
import {ModuleUpdateComponent} from './module-update/module-update.component';

@Component({
  selector: 'ngx-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  theme;
  loading = false;
  rows: Object[];
  parents: Module[] = [];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'module.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'module.column.code', prop: 'code', flexGrow: 0.7, minWidth: 70},
    {name: 'module.column.name', prop: 'name', flexGrow: 1, minWidth: 100},
    {name: 'module.column.path_url', prop: 'tel', flexGrow: 1, minWidth: 100},
    {name: 'module.column.update_time', prop: 'updateTime', flexGrow: 1, minWidth: 100},
    {name: 'module.column.status', prop: 'status', flexGrow: 0.9, minWidth: 90},
    {name: 'module.column.action', prop: 'action', flexGrow: 0.6, minWidth: 60},
  ];
  lstStatus = [
    {value: null, name: 'common.status.clean'},
    {value: true, name: 'common.status.true'},
    {value: false, name: 'common.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private moduleService: ModuleService,
              private fb: FormBuilder,
              private dialog: NbDialogService,
              private toastr: CustomToastrService) {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  ngOnInit(): void {
    this.search();
    this.searchParent();
  }

  searchParent(id?: number) {
    this.moduleService.getAllParent().subscribe((res: HttpResponse<Module[]>) => {
      this.parents = res.body || [];
      if ( id && this.formSearch.get('parentId').value === id) {
        this.formSearch.get('parentId').setValue(null);
      }
    });
  }

  formSearch = this.fb.group({
    code: new FormControl(null),
    name: new FormControl(null),
    status: new FormControl(null),
    parentId: new FormControl(null),
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
    this.moduleService.doSearch(this.dataSearch, {
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
    this.dialog.open(ModuleUpdateComponent, {
      context: {
        data: data,
        parents: this.parents,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      if (res?.result === 'complete') {
        this.setPage({offset: 0});
        this.searchParent();
      }
    });
  }

  delete(data: Module) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('module.label.delete'),
        message: this.translate.instant('module.label.message_delete') + ' ' + data.name + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.moduleService.delete(data).subscribe((success) => {
            this.toastr.success('common.label.delete_success', true);
            this.setPage({offset: 0});
            this.searchParent(data.id);
          },
          (error) => {
            this.loading = false;
            this.toastr.error(error.error.title);
          });
      }
    });
  }
}
