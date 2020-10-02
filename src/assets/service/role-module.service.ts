import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class RoleModuleService {

  constructor(private http: HttpClient) {
  }

  getAll(id: number): Observable<HttpResponse<Array<any>>> {
    return this.http.get<Array<any>>(`${environment.api}/roleModule/getAll/${id}`, {
      observe: 'response',
    });
  }

}
