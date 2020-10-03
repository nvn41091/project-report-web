import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {Observable} from 'rxjs';

@Injectable()
export class UserRoleService {

  constructor(private http: HttpClient) {
  }

  getByUserId(id: number): Observable<HttpResponse<Array<UserRole>>> {
    return this.http.get<Array<UserRole>>(`${environment.api}/userRole/getByUserId/${id}`, {
      observe: 'response',
    });
  }
}

export class UserRole {
  id: number;
  userId: number;
  roleId: number;
  updateTime: Date;
}
