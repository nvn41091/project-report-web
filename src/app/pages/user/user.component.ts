import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  constructor(private translate: TranslateService) {
  }

  ngOnInit(): void {
  }

  search() {
  }

}
