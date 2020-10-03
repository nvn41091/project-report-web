import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {LayoutService} from '../../../@core/utils';
import {map, takeUntil, filter} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbTokenService} from '@nebular/auth';
import {TranslateService} from '@ngx-translate/core';
import {User, UserService} from '../../../../assets/service/user.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  tag = 'ngx-header';
  user: User;
  requestAcceptCompany = [
    {id: 1, userName: 'nvn41091', fullName: 'Nguyễn Văn Ngọc'},
    {id: 2, userName: 'ngoc41099', fullName: 'Ngọc NV'},
  ];

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    {title: 'Profile', icon: 'person-outline', data: 'profile'},
    {title: 'Log out', icon: 'log-out-outline', data: 'logout'},
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private tokenService: NbTokenService,
              public translate: TranslateService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    this.menuService.onItemClick()
      .pipe(filter(({tag}) => tag === this.tag))
      .subscribe(bag => this.onMenuClick(bag.item));

    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.userService.updateUser.subscribe(res => this.user = res);
    this.userService.getUserInfo().subscribe(res => this.userService.changeUser(res.body));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }

  onMenuClick(item) {
    switch (item.data) {
      case 'logout':
        this.tokenService.clear();
        window.location.reload();
        break;
    }
  }
}
