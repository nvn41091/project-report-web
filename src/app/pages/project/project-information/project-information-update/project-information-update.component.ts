import { Component, OnInit } from '@angular/core';
import {ProjectInformation} from '../../../../../assets/service/project-information.service';

@Component({
  selector: 'ngx-project-information-update',
  templateUrl: './project-information-update.component.html',
  styleUrls: ['./project-information-update.component.scss']
})
export class ProjectInformationUpdateComponent implements OnInit {
  data: ProjectInformation;

  constructor() { }

  ngOnInit(): void {
  }

}
