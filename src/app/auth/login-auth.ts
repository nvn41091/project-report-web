import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService} from '@nebular/auth';
import {from} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class LoginAuth implements CanActivate {

  constructor(private authService: NbAuthService, private router: Router) {
  }

  canActivate() {
    return from(this.isAuthen());
  }

  async isAuthen() {
    let val: boolean = false;
    await this.authService.isAuthenticated().toPromise().then(value => {
      if (value) {
        this.router.navigate([environment.homePage]);
      }
      val = !value;
    });
    return val;
  }
}
