import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectInformationComponent } from './project-information/project-information.component';
import {NbButtonModule, NbCardModule, NbIconModule} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NbSecurityModule} from '@nebular/security';

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
  ],
})
export class ProjectModule { }
