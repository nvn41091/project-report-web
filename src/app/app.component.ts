/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {AnalyticsService, SeoService} from './@core/utils';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
declare let $: any;

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
  providers: [
    Location, {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
})
export class AppComponent implements OnInit {
  location: any;
  routerSubscription: any;

  constructor(private analytics: AnalyticsService,
              private seoService: SeoService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
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
