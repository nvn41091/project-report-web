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

@NgModule({
  declarations: [KpiMapComponent, InlineMessageComponent, NgxResizeWatcherDirective, UppercaseDirective],
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
  ],
  providers: [],
})
export class SharedModule {
}
