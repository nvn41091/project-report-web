import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../assets/service/company.service';

@Component({
  selector: 'ngx-company-role',
  templateUrl: './company-role.component.html',
  styleUrls: ['./company-role.component.scss'],
})
export class CompanyRoleComponent implements OnInit {
  company: Company;
  constructor() { }

  ngOnInit(): void {
  }

}
