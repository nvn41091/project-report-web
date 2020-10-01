import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class ModuleActionService {

  constructor(private http: HttpClient) {
  }

  getByModuleId(id: number): Observable<HttpResponse<Array<ModuleAction>>> {
    return this.http.get<Array<ModuleAction>>(`${environment.api}/moduleAction/getByModuleId/${id}`, {
      observe: 'response',
    });
  }

}

export class ModuleAction {
  id: number;
  moduleId: number;
  actionId: number;
  updateTime: Date;
}
