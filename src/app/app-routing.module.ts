import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
} from '@nebular/auth';
import {PagesAuth} from './auth/pages-auth';
import {NgxLoginComponent} from './auth/login/login.component';
import {NgxRegisterComponent} from './auth/register/register.component';
import {LoginAuth} from './auth/login-auth';
import { RequestPasswordComponent } from './auth/request-password/request-password.component';

export const routes: Routes = [
  {
    path: 'pages',
    canActivate: [PagesAuth],
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    canActivate: [LoginAuth],
    children: [
      {
        path: '',
        component: NgxLoginComponent,
      },
      {
        path: 'login',
        component: NgxLoginComponent,
      },
      {
        path: 'request-password',
        component: RequestPasswordComponent,
      },
      {
        path: 'register',
        component: NgxRegisterComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
