import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule, NbPopoverModule, NbCardModule, NbTooltipModule,
} from '@nebular/theme';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {NbSecurityModule} from '@nebular/security';

import {
  FooterComponent,
  HeaderComponent,
  SearchInputComponent,
  TinyMCEComponent,
} from './components';
import {
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
} from './pipes';
import {
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
} from './layouts';
import {DEFAULT_THEME} from './styles/theme.default';
import {COSMIC_THEME} from './styles/theme.cosmic';
import {CORPORATE_THEME} from './styles/theme.corporate';
import {DARK_THEME} from './styles/theme.dark';
import {AuthSerivce} from '../../assets/service/auth.serivce';
import {UserService} from '../../assets/service/user.service';
import {CompanyService} from '../../assets/service/company.service';
import {TranslateModule} from '@ngx-translate/core';
import {ActionService} from '../../assets/service/action.service';
import {ModuleService} from '../../assets/service/module.service';
import {ModuleActionService} from '../../assets/service/module-action.service';
import {RoleService} from '../../assets/service/role.service';
import {RoleModuleService} from '../../assets/service/role-module.service';
import {UserRoleService} from '../../assets/service/user-role.service';
import {CompanyRoleService} from '../../assets/service/company-role.service';

const NB_MODULES = [
  NbLayoutModule,
  NbMenuModule,
  NbUserModule,
  NbActionsModule,
  NbSearchModule,
  NbSidebarModule,
  NbContextMenuModule,
  NbSecurityModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  SearchInputComponent,
  TinyMCEComponent,
  OneColumnLayoutComponent,
  ThreeColumnsLayoutComponent,
  TwoColumnsLayoutComponent,
];
const PIPES = [
  CapitalizePipe,
  PluralPipe,
  RoundPipe,
  TimingPipe,
  NumberWithCommasPipe,
];
const SERVICE = [
  AuthSerivce,
  UserService,
  CompanyService,
  ActionService,
  ModuleService,
  ModuleActionService,
  RoleService,
  RoleModuleService,
  UserRoleService,
  CompanyRoleService,
];

@NgModule({
  imports: [CommonModule, ...NB_MODULES, NbPopoverModule, NbCardModule, TranslateModule, NbTooltipModule],
  exports: [CommonModule, ...PIPES, ...COMPONENTS],
  declarations: [...COMPONENTS, ...PIPES],
  providers: [...SERVICE],
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<ThemeModule> {
    return {
      ngModule: ThemeModule,
      providers: [
        ...NbThemeModule.forRoot(
          {
            name: 'default',
          },
          [DEFAULT_THEME, COSMIC_THEME, CORPORATE_THEME, DARK_THEME],
        ).providers,
      ],
    };
  }
}
