import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AppParamComponent} from './app-param.component';

const routes: Routes = [{
  path: '',
  component: AppParamComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppParamRoutingModule { }
