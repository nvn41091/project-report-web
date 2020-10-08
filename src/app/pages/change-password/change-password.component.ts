import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  isRequestPassword: boolean = false;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.isRequestPassword = this.router.getCurrentNavigation()?.extras.state?.request;
  }

}
