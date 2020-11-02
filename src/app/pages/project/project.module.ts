import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NbSecurityModule} from '@nebular/security';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {SharedModule} from '../../shared/shared.module';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';

@NgModule({
  declarations: [ProjectComponent, ProjectInformationComponent],
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
  ],
})
export class ProjectModule { }
