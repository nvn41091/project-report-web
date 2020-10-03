import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleComponent } from './role.component';
import {
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { RoleModuleComponent } from './role-module/role-module.component';
import {TreeviewModule} from 'ngx-treeview';
import {NbSecurityModule} from '@nebular/security';


@NgModule({
  declarations: [RoleComponent, RoleUpdateComponent, RoleModuleComponent],
    imports: [
        CommonModule,
        RoleRoutingModule,
        NbIconModule,
        TranslateModule,
        NgxDatatableModule,
        NbSpinnerModule,
        NbCardModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbButtonModule,
        SharedModule,
        NgxTrimDirectiveModule,
        NbInputModule,
        NbToggleModule,
        TreeviewModule.forRoot(),
        NbSecurityModule,
    ],
})
export class RoleModule { }
