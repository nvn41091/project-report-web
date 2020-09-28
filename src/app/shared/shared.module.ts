import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {KpiMapComponent} from './components/kpi-map/kpi-map.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {InlineMessageComponent} from './directives/inline-message/inline-message.component';
import {TranslateModule} from '@ngx-translate/core';
import {NgxResizeWatcherDirective} from './directives/ngx-resize-watcher.directive';
import {UppercaseDirective} from './directives/uppercase.directive';
import {NullValueDirective} from './directives/null-value.directive';

@NgModule({
  declarations: [
    KpiMapComponent,
    InlineMessageComponent,
    NgxResizeWatcherDirective,
    UppercaseDirective,
    NullValueDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbInputModule,
    NbCardModule,
    NgSelectModule,
    NbButtonModule,
    TranslateModule,
    NbIconModule,
    ReactiveFormsModule,
  ],
  exports: [
    InlineMessageComponent,
    NgxResizeWatcherDirective,
    UppercaseDirective,
    NullValueDirective,
  ],
  providers: [],
})
export class SharedModule {
}
