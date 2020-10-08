import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RequestPasswordService {

  constructor(private http: HttpClient) {
  }

  requestEmail(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${environment.api}/request-email`, data, {
      observe: 'response',
    });
  }

  requestPassword(data: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${environment.api}/request-password`, data, {
      observe: 'response',
    });
  }
}
