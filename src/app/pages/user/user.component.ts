import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbThemeService} from '@nebular/theme';
import {HttpHeaders} from '@angular/common/http';
import {UserService} from '../../../assets/service/user.service';
import {FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  theme;
  loading = false;
  rows: Object[];
  page = {
    limit: 5,
    count: 0,
    offset: 0,
  };
  columns = [
    {name: 'user.index', prop: 'index', flexGrow: 0.3},
    {name: 'user.userName', prop: 'userName', flexGrow: 1.5},
    {name: 'user.fullName', prop: 'fullName', flexGrow: 1.7},
    {name: 'user.email', prop: 'email', flexGrow: 1.5},
    {name: 'user.status.title', prop: 'status', flexGrow: 1},
    {name: 'user.action', prop: 'action_btn', flexGrow: 0.6},
  ];
  lstStatus = [
    {value: true, name: 'user.status.true'},
    {value: false, name: 'user.status.false'},
  ];

  constructor(private translate: TranslateService,
              private themeService: NbThemeService,
              private userService: UserService,
              private fb: FormBuilder) {
    this.themeService.onThemeChange()
      .subscribe((theme: any) => {
        this.theme = theme.name;
      });
  }

  ngOnInit(): void {
    this.search();
  }

  dataSearch = this.fb.group({
    userName: new FormControl(null),
    fullName: new FormControl(null),
    email: new FormControl(null),
    status: new FormControl(null),
  });

  search() {
    if (!this.loading) {
      this.setPage({offset: 0});
    }
  }

  setPage(pageInfo) {
    this.loading = true;
    const pageToLoad: number = pageInfo.offset;
    this.userService.doSearch(this.dataSearch.value, {
      page: pageToLoad,
      size: this.page.limit,
    }).subscribe(res => this.onSuccess(res.body, res.headers, pageToLoad));
  }

  protected onSuccess(data: any | null, headers: HttpHeaders, page: number): void {
    this.page.count = Number(headers.get('X-Total-Count'));
    this.page.offset = page || 0;
    this.rows = data || [];
    this.loading = false;
  }

  pageCallback(pageInfo: { count?: number, pageSize?: number, limit?: number, offset?: number }) {
    this.setPage(pageInfo);
  }

  edit(data) {
  }

  delete(data) {
  }
}
