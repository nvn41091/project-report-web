import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, NavigationStart, NavigationCancel, NavigationEnd} from '@angular/router';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {filter} from 'rxjs/operators';

declare let $: any;

@Component({
  selector: 'ngx-home',
  styleUrls: ['home.component.scss'],
  template: `
    <app-preloader></app-preloader>
    <router-outlet></router-outlet>
  `,
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  location: any;
  routerSubscription: any;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.recallJsFuntions();
  }

  recallJsFuntions() {
    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          $('#preloader').fadeIn('slow');
        }
      });
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd || event instanceof NavigationCancel))
      .subscribe(event => {
        $.getScript('assets/js/main.js');
        $('#preloader').fadeOut('slow');
        this.location = this.router.url;
        if (!(event instanceof NavigationEnd)) {
          return;
        }
        window.scrollTo(0, 0);
      });
  }
}
