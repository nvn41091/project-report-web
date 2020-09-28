import { Component, OnInit } from '@angular/core';
import {Company} from '../../../../assets/service/company.service';

@Component({
  selector: 'ngx-company-update',
  templateUrl: './company-update.component.html',
  styleUrls: ['./company-update.component.scss'],
})
export class CompanyUpdateComponent implements OnInit {
  data: Company;

  constructor() { }

  ngOnInit(): void {
  }

}
