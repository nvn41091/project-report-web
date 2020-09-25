import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ThemeModule} from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
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
  ],
  declarations: [UserComponent],
})
export class UserModule { }
