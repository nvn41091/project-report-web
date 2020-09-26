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
import {NgxResizeWatcherDirective} from '../../@theme/directives/ngx-resize-watcher.directive';
import { UserUpdateComponent } from './user-update/user-update.component';
import {SharedModule} from '../../shared/shared.module';

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
    ],
  declarations: [UserComponent, NgxResizeWatcherDirective, UserUpdateComponent],
  exports: [NgxResizeWatcherDirective],
})
export class UserModule { }
