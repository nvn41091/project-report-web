import { NgModule } from '@angular/core';
import { DemoComponent } from './demo.component';
import { DemoRoutingModule } from './demo-routing.module';

import { PreloaderComponent } from './layouts/preloader/preloader.component';
import { Header1Component } from './layouts/header1/header1.component';
import { Header2Component } from './layouts/header2/header2.component';
import { Header3Component } from './layouts/header3/header3.component';
import { ShopSidebarComponent } from './layouts/shop-sidebar/shop-sidebar.component';
import { BlogSidebarComponent } from './layouts/blog-sidebar/blog-sidebar.component';
import { ServiceSidebarComponent } from './layouts/service-sidebar/service-sidebar.component';
import { Footer1Component } from './layouts/footer1/footer1.component';
import { Footer2Component } from './layouts/footer2/footer2.component';
import { Homepage1Component } from './pages/homepage1/homepage1.component';
import { Homepage2Component } from './pages/homepage2/homepage2.component';
import { Homepage3Component } from './pages/homepage3/homepage3.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { TeamComponent } from './pages/team/team.component';
import { TeamDetailsComponent } from './pages/team-details/team-details.component';
import { CareerComponent } from './pages/career/career.component';
import { FaqComponent } from './pages/faq/faq.component';
import { Service1Component } from './pages/service1/service1.component';
import { Service2Component } from './pages/service2/service2.component';
import { ServiceDetailComponent } from './pages/service-detail/service-detail.component';
import { BlogStandardComponent } from './pages/blog-standard/blog-standard.component';
import { BlogGridComponent } from './pages/blog-grid/blog-grid.component';
import { BlogDetailComponent } from './pages/blog-detail/blog-detail.component';
import { Portfolio1Component } from './pages/portfolio1/portfolio1.component';
import { Portfolio2Component } from './pages/portfolio2/portfolio2.component';
import { PortfolioDetailComponent } from './pages/portfolio-detail/portfolio-detail.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ShopDetailComponent } from './pages/shop-detail/shop-detail.component';
import { ContactusComponent } from './pages/contactus/contactus.component';

@NgModule({
  imports: [
    DemoRoutingModule,
  ],
  declarations: [
    DemoComponent,
    PreloaderComponent,
    Header1Component,
    Header2Component,
    Header3Component,
    ShopSidebarComponent,
    BlogSidebarComponent,
    ServiceSidebarComponent,
    Footer1Component,
    Footer2Component,
    Homepage1Component,
    Homepage2Component,
    Homepage3Component,
    AboutusComponent,
    TeamComponent,
    TeamDetailsComponent,
    CareerComponent,
    FaqComponent,
    Service1Component,
    Service2Component,
    ServiceDetailComponent,
    BlogStandardComponent,
    BlogGridComponent,
    BlogDetailComponent,
    Portfolio1Component,
    Portfolio2Component,
    PortfolioDetailComponent,
    ShopComponent,
    ShopDetailComponent,
    ContactusComponent
  ],
})
export class DemoModule {
}
