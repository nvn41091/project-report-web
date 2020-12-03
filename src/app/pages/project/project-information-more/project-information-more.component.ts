import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {ProjectProgressComponent} from '../project-progress/project-progress.component';
import {ProjectStageComponent} from '../project-stage/project-stage.component';

@Component({
  selector: 'ngx-project-information-more',
  templateUrl: './project-information-more.component.html',
  styleUrls: ['./project-information-more.component.scss']
})
export class ProjectInformationMoreComponent implements OnInit {
  private id;
  tabs: Tab[] = [
    {
      title: 'pri_more.progress',
      icon: 'person',
      component: ProjectProgressComponent,
    },
    {
      title: 'pri_more.stage',
      icon: 'person',
      component: ProjectStageComponent,
    }
  ];

  constructor(private route: ActivatedRoute,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

}

export class Tab {
  title: string;
  icon: string;
  component: Type<any>;
}
