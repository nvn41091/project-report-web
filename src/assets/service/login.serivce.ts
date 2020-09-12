import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginSerivce {
  constructor(private http: HttpClient) {
  }

  login(body): Observable<any> {
    return this.http.post<any>(`${environment.api}/authenticate`, body, {
      responseType: 'json',
      observe: 'response',
    });
  }
}
