import {Inject, Injectable, Injector} from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {NbTokenService} from '@nebular/auth';
import {CustomToastrService} from '../shared/services/custom-toastr.service';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private localStore: LocalStorageService,
    private jwtService: NbTokenService,
    @Inject(Injector) private injector: Injector,
  ) {}

  private get toastr(): CustomToastrService {
    return this.injector.get(CustomToastrService);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => {
        if (err.status === 401 && err.url && !err.url.includes('/authenticate')) {
          this.jwtService.clear();
          this.localStore.clear('token');
          this.router.navigate(['auth/login']).then(r => this.toastr.error('common.label.token_expired', true));
        }
      }),
    );
  }
}
