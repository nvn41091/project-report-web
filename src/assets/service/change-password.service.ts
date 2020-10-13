import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChangePasswordService {

  constructor(private http: HttpClient) {
  }

  resetPassword(data: any, req?: any): Observable<HttpResponse<any>> {
    const options = createRequestOption(req);
    return this.http.post<any>(`${environment.api}/changePassword`, data, {
      params: options,
      observe: 'response',
    });
  }
}
