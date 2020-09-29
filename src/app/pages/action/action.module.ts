import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionComponent } from './action.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule, NbToggleModule
} from "@nebular/theme";
import {TranslateModule} from "@ngx-translate/core";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ReactiveFormsModule} from "@angular/forms";
import {NgxTrimDirectiveModule} from "ngx-trim-directive";
import { ActionUpdateComponent } from './action-update/action-update.component';
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [ActionComponent, ActionUpdateComponent],
  imports: [
    CommonModule,
    NbIconModule,
    TranslateModule,
    NgxDatatableModule,
    NbSpinnerModule,
    NbCardModule,
    NbSelectModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NgxTrimDirectiveModule,
    SharedModule,
    NbToggleModule
  ]
})
export class ActionModule { }
