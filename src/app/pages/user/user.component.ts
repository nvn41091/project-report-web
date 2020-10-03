import {ChangeDetectorRef, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbDialogService, NbThemeService} from '@nebular/theme';
import {HttpHeaders} from '@angular/common/http';
import {User, UserService} from '../../../assets/service/user.service';
import {FormBuilder, FormControl} from '@angular/forms';
import {ConfirmDialogComponent} from '../../share-lib-module/confirm-dialog/confirm-dialog.component';
import {UserUpdateComponent} from './user-update/user-update.component';
import {CustomToastrService} from '../../shared/services/custom-toastr.service';
import {NbAccessChecker} from '@nebular/security';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit {
  theme;
  grand: boolean = false;
  loading = false;
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  dataSearch;
  columns = [
    {name: 'user.index', prop: 'index', flexGrow: 0.3, minWidth: 45},
    {name: 'user.userName', prop: 'userName', flexGrow: 1.3, minWidth: 195},
    {name: 'user.fullName', prop: 'fullName', flexGrow: 1.5, minWidth: 225},
    {name: 'user.email', prop: 'email', flexGrow: 1.5, minWidth: 225},
    {name: 'user.status.title', prop: 'status', flexGrow: 1, minWidth: 150},
    {name: 'user.action', prop: 'action_btn', flexGrow: 0.6, minWidth: 100},
  ];
  lstStatus = [
    {value: null, name: 'common.status.clean'},
    {value: true, name: 'common.status.true'},
    {value: false, name: 'common.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private userService: UserService,
              private fb: FormBuilder,
              private dialog: NbDialogService,
              private toastr: CustomToastrService,
              public accessChecker: NbAccessChecker) {
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  async author() {
    await this.accessChecker.isGranted('access', 'USER#SEARCH').subscribe(grand => this.grand = grand);
  }

  ngOnInit(): void {
    this.author().then(r => {});
    this.search();
  }

  formSearch = this.fb.group({
    userName: new FormControl(null),
    fullName: new FormControl(null),
    email: new FormControl(null),
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
      this.userService.doSearch(this.dataSearch, {
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
    this.dialog.open(UserUpdateComponent, {
      context: {
        data: data,
      },
      dialogClass: 'modal-full',
      hasScroll: true,
    }).onClose.subscribe(res => {
      res?.result === 'complete' ? this.setPage({offset: 0}) : {};
    });
  }

  delete(data: User) {
    this.dialog.open(ConfirmDialogComponent, {
      context: {
        title: this.translate.instant('user.title_delete'),
        message: this.translate.instant('user.message_delete') + ' ' + data.userName + ' ?',
      },
    }).onClose.subscribe(res => {
      if (res === 'confirm') {
        this.loading = true;
        this.userService.delete(data).subscribe((success) => {
            this.toastr.success('user.delete_success', true);
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
