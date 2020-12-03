import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProjectRoutingModule} from './project-routing.module';
import {ProjectComponent} from './project.component';
import {ProjectInformationComponent} from './project-information/project-information.component';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule,
  NbIconModule,
  NbInputModule, NbRouteTabsetModule,
  NbSelectModule,
  NbSpinnerModule, NbTabsetModule, NbToggleModule
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NbSecurityModule} from '@nebular/security';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import {ProjectInformationUpdateComponent} from './project-information/project-information-update/project-information-update.component';
import {ProjectStageComponent} from './project-stage/project-stage.component';
import {ListViewModule} from '@syncfusion/ej2-angular-lists';
import {NbDateFnsDateModule} from '@nebular/date-fns';
import {NbMomentDateModule} from '@nebular/moment';
import {ProjectProgressComponent} from './project-progress/project-progress.component';
import {ProjectInformationMoreComponent} from './project-information-more/project-information-more.component';

@NgModule({
  declarations: [
    ProjectComponent,
    ProjectInformationComponent,
    ProjectInformationUpdateComponent,
    ProjectStageComponent,
    ProjectProgressComponent,
    ProjectInformationMoreComponent
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    NbCardModule,
    TranslateModule,
    NbButtonModule,
    NbIconModule,
    NbSecurityModule,
    ReactiveFormsModule,
    NbSelectModule,
    NgxDatatableModule,
    SharedModule,
    NbSpinnerModule,
    NbInputModule,
    NgxTrimDirectiveModule,
    ListViewModule,
    NbToggleModule,
    NbDatepickerModule,
    NbDateFnsDateModule.forRoot({}),
    NbMomentDateModule,
    NbAutocompleteModule,
    NbRouteTabsetModule,
    NbTabsetModule,
  ]
})
export class ProjectModule {
}
