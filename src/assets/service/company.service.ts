import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<Company>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<Company>>(`${environment.api}/company/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/company/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/company/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/company/insert`, data, {
      observe: 'response',
    });
  }

  autoCompleteCustomer(data: any) {
    return this.http.post<Array<Company>>(`${environment.api}/company/autoCompleteCustomer`, data, {
      observe: 'response',
    });
  }

}

export class Company {
  id: number;
  code: string;
  name: string;
  tel: string;
  email: string;
  description: string;
  updateTime: number;
  status: boolean;
  createBy: number;
}
