import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class ActionService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<Action>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<Action>>(`${environment.api}/action/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/action/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/action/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/action/insert`, data, {
      observe: 'response',
    });
  }

  getAll(): Observable<HttpResponse<Array<Action>>> {
    return this.http.get<Array<Action>>(`${environment.api}/action/getAll`, {
      observe: 'response',
    });
  }

}

export class Action {
  id: number;
  code: string;
  name: string;
  description: string;
  updateTime: number;
  status: boolean;
}
