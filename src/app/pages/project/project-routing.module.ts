import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectInformationComponent} from './project-information/project-information.component';
import {ProjectStageComponent} from './project-stage/project-stage.component';

const routes: Routes = [{
  path: '',
  component: ProjectComponent,
  children: [
    {
      path: 'information',
      component: ProjectInformationComponent,
    },
    {
      path: 'stage',
      component: ProjectStageComponent,
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
