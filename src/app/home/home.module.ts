import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import {
  NbActionsModule, NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbSelectModule,
  NbUserModule
} from '@nebular/theme';
import {HomeFooterComponent, HomeHeaderComponent} from './components';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [HomeComponent, HomeHeaderComponent, HomeFooterComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NbLayoutModule,
    NbIconModule,
    TranslateModule,
    NbActionsModule,
    NbSelectModule,
    NbUserModule,
    NbContextMenuModule,
    NbCardModule
  ]
})
export class HomeModule { }
