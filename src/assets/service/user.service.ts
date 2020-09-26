import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  doSearch(data: any, req?: any) {
    const options = createRequestOption(req);
    return this.http.post<Array<User>>(`${environment.api}/user/doSearch`, data, {
      params: options,
      observe: 'response',
    });
  }

  delete(data: any) {
    return this.http.post<any>(`${environment.api}/user/delete`, data, {
      observe: 'response',
    });
  }

  update(data: any) {
    return this.http.post<any>(`${environment.api}/user/update`, data, {
      observe: 'response',
    });
  }

  insert(data: any) {
    return this.http.post<any>(`${environment.api}/user/insert`, data, {
      observe: 'response',
    });
  }

}

export class User {
  id: number;
  userName: string;
  passwordHash: string;
  fullName: string;
  email: string;
  imageUrl: string;
  status: number;
  langKey: string;
  activationKey: string;
  resetKey: string;
  createdBy: string;
  createDate: Date;
  resetDate: Date;
  lastModifiedBy: string;
  lastModifiedDate: Date;
  fingerprint: string;
}
