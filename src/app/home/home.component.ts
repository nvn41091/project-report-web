import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ngx-home',
  template: `
    <ngx-home-header></ngx-home-header>
    <router-outlet></router-outlet>
    <ngx-home-footer></ngx-home-footer>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
