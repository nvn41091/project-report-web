import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule, NbInputModule,
  NbSelectModule,
  NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {SharedModule} from '../../shared/shared.module';
import { CompanyUpdateComponent } from './company-update/company-update.component';
import {NbSecurityModule} from '@nebular/security';
import { CompanyRoleComponent } from './company-role/company-role.component';

@NgModule({
  declarations: [CompanyComponent, CompanyUpdateComponent, CompanyRoleComponent],
    imports: [
        CommonModule,
        NbIconModule,
        TranslateModule,
        NgxDatatableModule,
        NbCardModule,
        ReactiveFormsModule,
        NbSelectModule,
        NbSpinnerModule,
        NgxTrimDirectiveModule,
        NbButtonModule,
        NbInputModule,
        SharedModule,
        NbToggleModule,
        NbSecurityModule,
    ],
})
export class CompanyModule { }
