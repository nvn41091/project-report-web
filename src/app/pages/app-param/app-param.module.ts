import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppParamRoutingModule } from './app-param-routing.module';
import { AppParamComponent } from './app-param.component';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
  NbToggleModule
} from '@nebular/theme';
import {NbSecurityModule} from '@nebular/security';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {SharedModule} from '../../shared/shared.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { AppParamUpdateComponent } from './app-param-update/app-param-update.component';

@NgModule({
  declarations: [AppParamComponent, AppParamUpdateComponent],
  imports: [
    CommonModule,
    AppParamRoutingModule,
    NbCardModule,
    NbIconModule,
    NbSecurityModule,
    ReactiveFormsModule,
    TranslateModule,
    NbInputModule,
    NgxTrimDirectiveModule,
    SharedModule,
    NbSelectModule,
    NgxDatatableModule,
    NbSpinnerModule,
    NbButtonModule,
    NbToggleModule,
    NbAutocompleteModule
  ]
})
export class AppParamModule { }
