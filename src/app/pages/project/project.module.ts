import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectRoutingModule } from './project-routing.module';
import { ProjectComponent } from './project.component';
import { ProjectInformationComponent } from './project-information/project-information.component';


@NgModule({
  declarations: [ProjectComponent, ProjectInformationComponent],
  imports: [
    CommonModule,
    ProjectRoutingModule,
  ],
})
export class ProjectModule { }
