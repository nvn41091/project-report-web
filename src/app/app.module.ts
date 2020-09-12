/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LOCALE_ID, NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClient} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbChatModule, NbCheckboxModule,
  NbDatepickerModule,
  NbDialogModule, NbInputModule,
  NbMenuModule,
  NbSidebarModule, NbSpinnerModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {AuthGuard} from './auth/auth-guard';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
} from '@nebular/auth';
import {APP_BASE_HREF} from '@angular/common';
import {NgxLoginComponent} from './auth/login/login.component';
import {AuthExpiredInterceptor} from './auth/auth-expired.interceptor';
import {FingerPrintInterceptor} from './auth/FingerPrintInterceptor';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

@NgModule({
  declarations: [AppComponent, NgxLoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    NbAuthModule.forRoot(),
    NbCardModule,
    FormsModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAlertModule,
    ReactiveFormsModule,
    NbSpinnerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'vi',
    }),
  ],
  bootstrap: [AppComponent],
  providers: [AuthGuard,
    {provide: LOCALE_ID, useValue: 'vi-VI'},
    {provide: HTTP_INTERCEPTORS, useClass: AuthExpiredInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: FingerPrintInterceptor, multi: true},
    {provide: APP_BASE_HREF, useValue: '/'},
  ],
})
export class AppModule {
}

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
