import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ThemeModule} from '../../@theme/theme.module';
import { UserUpdateComponent } from './user-update/user-update.component';
import {SharedModule} from '../../shared/shared.module';
import {NbSecurityModule} from "@nebular/security";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NbCardModule,
        NbIconModule,
        NbButtonModule,
        NbInputModule,
        NgxTrimDirectiveModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        NbSpinnerModule,
        NbSelectModule,
        ThemeModule,
        TranslateModule,
        SharedModule,
        NbToggleModule,
        NbSecurityModule,
    ],
  declarations: [UserComponent, UserUpdateComponent],
})
export class UserModule { }
