import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import {NgxAuthBlockComponent} from '../auth/auth-block/auth-block.component';
import {UserComponent} from './user/user.component';
import {CompanyComponent} from './company/company.component';
import { ActionComponent } from './action/action.component';
import {ModuleComponent} from './module/module.component';
import {RoleComponent} from './role/role.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'home',
    },
    {
      path: 'user',
      component: UserComponent,
    },
    {
      path: 'company',
      component: CompanyComponent,
    },
    {
      path: 'action',
      component: ActionComponent,
    },
    {
      path: 'module',
      component: ModuleComponent,
    },
    {
      path: 'role',
      component: RoleComponent,
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NgxAuthBlockComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
