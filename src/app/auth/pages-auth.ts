import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {User, UserService} from '../../assets/service/user.service';
import {NbAclService} from '@nebular/security';
import {DataUserService} from '../shared/services/data-user.service';

@Injectable()
export class PagesAuth implements CanActivate {

  constructor(private authService: NbAuthService,
              private router: Router,
              private userService: UserService,
              private nbAciService: NbAclService,
              private dataUserService: DataUserService) {
  }

  canActivate() {
    return this.isAuthenticate();
  }

  async isAuthenticate() {
    let isAuth: boolean = false;
    await this.authService.isAuthenticated().subscribe(res => isAuth = res);
    if (isAuth) {
      let user = null;
      await this.getUserInfo().then(r => user = r);
      this.dataUserService.setUser(user);
      this.nbAciService.register('user', null, {['access']: user?.roles});
    } else {
      this.router.navigate(['auth/login']).then(r => {});
    }
    return isAuth;
  }

  async getUserInfo()  {
    let user: User = null;
    await this.userService.getUserInfo().toPromise().then(res => {
      user = res.body;
    });
    return user;
  }
}
