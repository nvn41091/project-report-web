import {Component, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'ngx-home',
  styleUrls: ['demo.component.scss'],
  template: `
    <app-preloader></app-preloader>
    <router-outlet></router-outlet>
  `,
})
export class DemoComponent {
}
