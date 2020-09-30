import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';
import {
    NbButtonModule,
    NbCardModule,
    NbIconModule,
    NbInputModule,
    NbSelectModule,
    NbSpinnerModule, NbToggleModule,
} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../../shared/shared.module';
import {NgxTrimDirectiveModule} from 'ngx-trim-directive';
import { ModuleUpdateComponent } from './module-update/module-update.component';


@NgModule({
  declarations: [ModuleComponent, ModuleUpdateComponent],
    imports: [
        CommonModule,
        ModuleRoutingModule,
        NbIconModule,
        TranslateModule,
        NgxDatatableModule,
        NbCardModule,
        NbSpinnerModule,
        NbSelectModule,
        ReactiveFormsModule,
        NbButtonModule,
        NbInputModule,
        SharedModule,
        NgxTrimDirectiveModule,
        NbToggleModule,
    ],
})
export class ModuleModule { }
