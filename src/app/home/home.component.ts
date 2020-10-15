import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ngx-home',
  styleUrls: ['home.component.scss'],
  template: `
    <router-outlet></router-outlet>
  `,
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  ngOnInit(): void {
  }
}
