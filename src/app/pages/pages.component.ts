import {Component, OnInit} from '@angular/core';

import {UserService} from '../../assets/service/user.service';
import {Module} from '../../assets/service/module.service';
import {NbMenuItem} from '@nebular/theme';
import {DataUserService} from '../shared/services/data-user.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu: NbMenuItem[] = [];

  constructor(private userService: UserService,
              private dataUserService: DataUserService) {
  }

  ngOnInit(): void {
    this.dataUserService.updateUser.subscribe(
      res => {
        const menu = this.formatMenu(res?.menus, null);
        menu.unshift({
          title: 'Trang chủ',
          icon: 'home-outline',
          link: '/pages/home',
          home: true,
        });
        this.menu = menu;
      });
  }

  formatMenu(modules: Module[], parentId: number) {
    const menus: NbMenuItem[] = [];
    for (let i = 0; i < modules?.length; i++) {
      if (modules[i].parentId === parentId) {
        const children = this.formatMenu(modules, modules[i].id);
        const menu: NbMenuItem = {
          title: modules[i].name,
          icon: modules[i].icon,
          link: modules[i].pathUrl,
          expanded: true,
        };
        if (children.length > 0) {
          menu.children = children;
        }
        menus.push(menu);
      }
    }
    return menus;
  }
}
