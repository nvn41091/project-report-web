import {Inject, Injectable, Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {NbDialogService} from '@nebular/theme';
import {ConfirmDialogComponent} from '../share-lib-module/confirm-dialog/confirm-dialog.component';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class ForbiddenInterceptor implements HttpInterceptor {

  constructor(private dialog: NbDialogService,
              @Inject(Injector) private injector: Injector) {
  }

  private get translate(): TranslateService {
    return this.injector.get(TranslateService);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 403) {
          this.dialog.open(ConfirmDialogComponent, {
            context: {
              message: this.translate.instant('common.label.forbidden'),
              hideCancel: true,
              title: this.translate.instant('common.label.notice'),
            },
          }).onClose.subscribe(res => window.location.reload());
          return of(error);
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
