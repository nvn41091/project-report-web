import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
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

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isAuthenticate(route, state);
  }

  async isAuthenticate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth: boolean = false;
    await this.authService.isAuthenticated().subscribe(res => isAuth = res);
    if (isAuth) {
      let user = null;
      await this.getUserInfo().then(r => user = r);
      this.dataUserService.setUser(user);
      this.nbAciService.register('user', null, {['access']: user?.roles});
      if (state.url === '/pages/home' || state.url === '/pages/404') {
        return true;
      }
      let check = false;
      for (let i = 0; i < user.menus.length; i ++) {
        const path =  state.url.substring(0, user.menus[i]?.pathUrl?.length);
        if (user.menus[i].pathUrl === path) {
          check = true;
        }
      }
      if (!check) {
        await this.router.navigate(['/pages/home']);
      }
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
