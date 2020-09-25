import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import {NbButtonModule, NbCardModule, NbIconModule, NbInputModule} from '@nebular/theme';
import {TranslateModule} from '@ngx-translate/core';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
  ],
  declarations: [UserComponent],
})
export class UserModule { }
