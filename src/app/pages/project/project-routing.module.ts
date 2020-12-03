import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProjectComponent} from './project.component';
import {ProjectInformationComponent} from './project-information/project-information.component';
import {ProjectInformationMoreComponent} from './project-information-more/project-information-more.component';
import {ProjectProgressComponent} from './project-progress/project-progress.component';
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
      path: 'more/:id',
      component: ProjectInformationMoreComponent,
      children: [
        {
          path: 'progress',
          component: ProjectProgressComponent,
        },
        {
          path: 'stage',
          component: ProjectStageComponent,
        }
      ]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule { }
