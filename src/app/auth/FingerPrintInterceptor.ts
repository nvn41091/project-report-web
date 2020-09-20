import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import * as Fingerprint2 from 'fingerprintjs2';

@Injectable()
export class FingerPrintInterceptor implements HttpInterceptor {
  fingerprint;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handle(req, next));
  }

  async handle(req: HttpRequest<any>, next: HttpHandler) {
    let fingerprint: string = '';
    await this.getFingerPrint().then((value: string) => fingerprint = value);
    req = req.clone({headers: req.headers.set('fingerprint', fingerprint)
        .set('Content-type', 'application/json; charset=UTF-8')
        .set('accept-charset', 'UTF-8')});
    return next.handle(req).toPromise();
  }

  constructor() {
  }

  getFingerPrint() {
    return new Promise(resolve => {
      const options = {excludeAdBlock: true};
      Fingerprint2.get(options, (components) => {
        const values = components.map((component) => component.value);
        resolve(Fingerprint2.x64hash128(values.join(''), 31));
      });
    });
  }
}
