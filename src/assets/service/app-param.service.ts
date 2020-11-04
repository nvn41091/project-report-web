import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppParamService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<AppParam>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<AppParam>>(`${environment.api}/app-param/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/app-param/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/app-param/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/app-param/insert`, data, {
      observe: 'response',
    });
  }

  autoCompleteType(type: any): Observable<HttpResponse<Array<string>>> {
    return this.http.post<Array<string>>(`${environment.api}/app-param/autoCompleteType`, type, {
      observe: 'response',
    });
  }

  getValueByType(type: string): Observable<HttpResponse<Array<AppParam>>> {
    return this.http.post<Array<AppParam>>(`${environment.api}/app-param/getValueByType`, {type: type}, {
      observe: 'response',
    });
  }
}

export class AppParam {
  id?: number;
  name?: string;
  type?: string;
  value?: string;
  description?: string;
  updateTime?: number;
  status?: boolean;
}
