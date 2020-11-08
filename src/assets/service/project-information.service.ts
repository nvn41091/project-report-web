import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectInformationService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any): Observable<HttpResponse<Array<ProjectInformation>>> {
    const options = createRequestOption(req);
    return this.http.post<Array<ProjectInformation>>(`${environment.api}/project-information/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.delete<any>(`${environment.api}/project-information/delete/${data.id}`, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.put<any>(`${environment.api}/project-information/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/project-information/insert`, data, {
      observe: 'response',
    });
  }
}

export class ProjectInformation {
  id?: number;
  code?: string;
  name?: string;
  startDate?: Date;
  endDatePlan?: Date;
  money?: number;
  customerId?: number;
  companyId?: number;
  description?: string;
  status?: any;
  updateTime: Date;
  actualEndTime: Date;
  customerName?: string;
  statusValue?: string;
}
