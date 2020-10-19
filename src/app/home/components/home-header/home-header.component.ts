import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';

import {LayoutService} from '../../../@core/utils';
import {map, takeUntil, filter} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbTokenService} from '@nebular/auth';
import {TranslateService} from '@ngx-translate/core';
import {User, UserService} from '../../../../assets/service/user.service';
import {DataUserService} from '../../../shared/services/data-user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-home-header',
  styleUrls: ['./home-header.component.scss'],
  templateUrl: './home-header.component.html',
})
export class HomeHeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  menuTag = 'home-menu';
  menuItems: NbMenuItem[] = [
    {
      title: '123',
    },
    {
      title: '234'
    }
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

  constructor(private themeService: NbThemeService,
              private breakpointService: NbMediaBreakpointsService,
              public translate: TranslateService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

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
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  navigateHome() {
  }
}
