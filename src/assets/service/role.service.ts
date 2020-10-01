import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class RoleService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<Role>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<Role>>(`${environment.api}/role/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/role/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/role/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/role/insert`, data, {
      observe: 'response',
    });
  }

}

export class Role {
  id: number;
  code: string;
  name: string;
  description: string;
  updateTime: number;
  status: boolean;
}
