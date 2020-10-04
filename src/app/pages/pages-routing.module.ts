import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {PagesComponent} from './pages.component';
import {UserComponent} from './user/user.component';
import {CompanyComponent} from './company/company.component';
import {ActionComponent} from './action/action.component';

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
      path: '404',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: 'role',
      loadChildren: () => import('./role/role.module')
        .then(m => m.RoleModule),
    },
    {
      path: 'module',
      loadChildren: () => import('./module/module.module')
        .then(m => m.ModuleModule),
    },
    {
      path: 'project',
      loadChildren: () => import('./project/project.module')
        .then(m => m.ProjectModule),
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full',
    },
    {
      path: '**',
      redirectTo: '404',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
