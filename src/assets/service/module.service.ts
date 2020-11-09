import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class ModuleService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<Module>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<Module>>(`${environment.api}/module/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/module/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/module/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/module/insert`, data, {
      observe: 'response',
    });
  }

  getAllParent(): Observable<HttpResponse<Array<Module>>> {
    return this.http.get<Array<Module>>(`${environment.api}/module/getAllParent`, {
      observe: 'response',
    });
  }

}

export class Module {
  id: number;
  code: string;
  name: string;
  description: string;
  status: boolean;
  pathUrl: string;
  icon: string;
  updateTime: number;
  accessUser: boolean;
  parentId: number;
  action: string;
}
