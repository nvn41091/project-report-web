import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable()
export class CompanyRoleService {

  constructor(private http: HttpClient) {
  }

  getAllByCompanyId(id: number): Observable<HttpResponse<Array<CompanyRole>>> {
    return this.http.get<Array<CompanyRole>>(`${environment.api}/companyRole/getAllByCompanyId/${id}`, {
      observe: 'response',
    });
  }

  save(data, companyId) {
    return this.http.post<any>(`${environment.api}/companyRole/save/${companyId}`, data, {
      observe: 'response',
    });
  }

}

export class CompanyRole {
  id: number;
  companyId: number;
  roleId: number;
  updateTime: Date;
}
