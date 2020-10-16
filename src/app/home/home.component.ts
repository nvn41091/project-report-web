import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'ngx-home',
  styleUrls: ['home.component.scss'],
  template: `
    <app-preloader></app-preloader>
    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
}
