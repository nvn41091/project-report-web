import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {HomeComponent} from './home.component';
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

const routes: Routes = [{
  path: '',
  component: HomeComponent,
  children: [
    {path: '', component: Homepage1Component},
    {path: 'homepage2', component: Homepage2Component},
    {path: 'homepage3', component: Homepage3Component},
    {path: 'about-us', component: AboutusComponent},
    {path: 'team', component: TeamComponent},
    {path: 'team-detail', component: TeamDetailsComponent},
    {path: 'career', component: CareerComponent},
    {path: 'FAQ', component: FaqComponent},
    {path: 'service-one', component: Service1Component},
    {path: 'service-two', component: Service2Component},
    {path: 'service-detail', component: ServiceDetailComponent},
    {path: 'blog-standard', component: BlogStandardComponent},
    {path: 'blog-grid', component: BlogGridComponent},
    {path: 'blog-detail', component: BlogDetailComponent},
    {path: 'portfolio-one', component: Portfolio1Component},
    {path: 'portfolio-two', component: Portfolio2Component},
    {path: 'portfolio-detail', component: PortfolioDetailComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'shop-detail', component: ShopDetailComponent},
    {path: 'contact-us', component: ContactusComponent},
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {
}
