import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {createRequestOption} from '../../app/shared/util/request-util';
import {BehaviorSubject, Observable} from 'rxjs';
import {Module} from './module.service';

@Injectable()
export class UserService {
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  updateUser = this.user.asObservable();

  constructor(private http: HttpClient) {
  }

  changeUser(user: User) {
    this.user.next(user);
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

  getUserInfo(): Observable<HttpResponse<User>> {
    return this.http.get<User>(`${environment.api}/getUserInfo`, {
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
  roles: string[];
  menus: Module[];
}
