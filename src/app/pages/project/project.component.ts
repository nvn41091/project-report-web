import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-project',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
