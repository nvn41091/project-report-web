import { NgModule } from '@angular/core';
import {NbMenuModule, NbRouteTabsetModule, NbTabsetModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import {UserModule} from './user/user.module';
import {CompanyModule} from './company/company.module';
import {ActionModule} from './action/action.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    UserModule,
    CompanyModule,
    ActionModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
