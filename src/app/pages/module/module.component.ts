import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {FormBuilder, FormControl} from '@angular/forms';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {HttpHeaders, HttpResponse} from '@angular/common/http';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {Module, ModuleService} from 'assets/service/module.service';
import {ModuleUpdateComponent} from './module-update/module-update.component';
import {NbAccessChecker} from '@nebular/security';

@Component({
  selector: 'ngx-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent implements OnInit {
  theme;
  loading = false;
  rows: Object[];
  grandSearch: boolean = false;
  grandUpdate: boolean = false;
  grandInsert: boolean = false;
  parents: Module[] = [];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'module.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'module.column.code', prop: 'code', flexGrow: 1.4, minWidth: 140},
    {name: 'module.column.name', prop: 'name', flexGrow: 1, minWidth: 100},
    {name: 'module.column.path_url', prop: 'pathUrl', flexGrow: 1, minWidth: 100},
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
              private toastr: CustomToastrService,
              private accessChecker: NbAccessChecker) {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  ngOnInit(): void {
    this.authorSearch().then(r => {});
    this.authorUpdate().then(r => {});
    this.authorInsert().then(r => {});
    this.search();
    this.searchParent();
  }

  async authorSearch() {
    await this.accessChecker.isGranted('access', 'MODULE#SEARCH').subscribe(grand => this.grandSearch = grand);
  }

  async authorUpdate() {
    await this.accessChecker.isGranted('access', 'MODULE#UPDATE').subscribe(grand => this.grandUpdate = grand);
  }

  async authorInsert() {
    await this.accessChecker.isGranted('access', 'MODULE#INSERT').subscribe(grand => this.grandInsert = grand);
  }

  formatData(data) {
    const arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].parentId !== null) {
        data[i].treeStatus = 'disabled';
      } else {
        data[i].treeStatus = 'expanded';
      }
      arr.push(data[i]);
    }
    return arr;
  }

  searchParent(id?: number) {
    if (this.grandSearch || this.grandUpdate || this.grandInsert) {
      this.moduleService.getAllParent().subscribe((res: HttpResponse<Module[]>) => {
        this.parents = res.body || [];
        if (id && this.formSearch.get('parentId').value === id) {
          this.formSearch.get('parentId').setValue(null);
        }
      });
    }
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

  onTreeAction(event: any) {
    const row = event.row;
    if (row.treeStatus === 'expanded') {
      row.treeStatus = 'collapsed';
    } else {
      row.treeStatus = 'expanded';
    }
    this.rows = [...this.rows];
  }

  setPage(pageInfo) {
    const pageToLoad: number = pageInfo.offset;
    if (this.grandSearch) {
      this.loading = true;
      this.moduleService.doSearch(this.dataSearch, {
        page: pageToLoad,
        size: this.page.limit,
      }).subscribe(res => this.onSuccess(this.formatData(res.body), res.headers, pageToLoad),
        () => this.loading = false);
    }
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = data.length;
    this.page.offset = page || 0;
    this.rows = data || [];
    this.loading = false;
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
        this.moduleService.delete(data).subscribe(() => {
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
