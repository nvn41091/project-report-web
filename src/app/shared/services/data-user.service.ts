import {BehaviorSubject} from 'rxjs';
import {User} from '../../../assets/service/user.service';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DataUserService {
  constructor() {
  }

  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  updateUser = this.user.asObservable();

  setUser(user: User) {
    this.user.next(user);
  }
}
