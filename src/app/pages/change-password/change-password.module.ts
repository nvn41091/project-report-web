import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';
import {NbButtonModule, NbCardModule, NbInputModule, NbSpinnerModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    NbButtonModule,
    NbSpinnerModule
  ]
})
export class ChangePasswordModule { }
