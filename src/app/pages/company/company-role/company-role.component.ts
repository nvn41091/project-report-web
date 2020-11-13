import {Component, OnInit} from '@angular/core';
import {Company} from '../../../../assets/service/company.service';
import {NbDialogRef, NbThemeService} from '@nebular/theme';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';
import {TranslateService} from '@ngx-translate/core';
import {ScrollbarHelper, DimensionsHelper, ColumnChangesService} from '@swimlane/ngx-datatable';
import {Role, RoleService} from '../../../../assets/service/role.service';
import {CompanyRole, CompanyRoleService} from '../../../../assets/service/company-role.service';

@Component({
  selector: 'ngx-company-role',
  templateUrl: './company-role.component.html',
  styleUrls: ['./company-role.component.scss'],
  providers: [ScrollbarHelper, DimensionsHelper, ColumnChangesService],
})
export class CompanyRoleComponent implements OnInit {
  company: Company;
  searchParam = {name: null};
  columns = [
    {prop: 'selected', name: '', flexGrow: 0.3, minWidth: 30},
    {name: 'role.column.index', prop: 'index', flexGrow: 0.3, minWidth: 30},
    {name: 'role.column.code', prop: 'code', flexGrow: 0.7, minWidth: 70},
    {name: 'role.column.name', prop: 'name', flexGrow: 1, minWidth: 100},
    {name: 'role.column.update_time', prop: 'updateTime', flexGrow: 1, minWidth: 100},
    {name: 'role.column.status', prop: 'status', flexGrow: 0.9, minWidth: 90},
  ];
  rows;
  theme: string;
  selectedUI = [];
  selected = [];
  originalData = [];

  constructor(private ref: NbDialogRef<CompanyRoleComponent>,
              private toastr: CustomToastrService,
              private translate: TranslateService,
              private themeService: NbThemeService,
              private roleService: RoleService,
              private companyRoleService: CompanyRoleService) {
  }

  protected onSuccess(data: any | null): void {
    this.rows = data || [];
    this.selectedUI = [];
    this.selected.map(value => {
      this.rows.map((value1) => {
        if (value === value1.id) {
          this.selectedUI.push(value1);
        }
      });
    });
  }

  ngOnInit(): void {
    this.companyRoleService.getAllByCompanyId(this.company.id).subscribe(
      data => {
        this.originalData = data.body;
        data.body.map(value => {
          this.selected.push(value.roleId);
        });
      },
      () => this.toAstrError(),
      () => this.search(),
    );
    this.themeService.onThemeChange().subscribe((theme: any) => {
      this.theme = theme.name;
    });
  }

  toAstrError() {
    this.toastr.unknownError();
  }

  onSelect({selected}) {
    this.selectedUI = [];
    this.selectedUI.push(...selected);
    this.rows.map((value) => {
      this.selected.map((value1, index) => {
        if (value.id === value1) {
          this.selected.splice(index, index + 1);
        }
      });
    });
    selected.map(value => this.selected.push(value.id));
  }

  search() {
    this.roleService.searchByCodeOrName({
      name: this.searchParam.name,
      id: this.company.id
    }).subscribe(res => this.onSuccess(res.body));
  }

  submit() {
    const selected: CompanyRole[] = [];
    this.selected.map(roleId => {
      selected.push({id: null, updateTime: new Date(), roleId: roleId, companyId: this.company.id});
    });
    this.companyRoleService.save(selected, this.company.id).subscribe(
      () => {
        this.ref.close('success');
        this.toastr.success('company.label.update_success', true);
      },
      () => this.toAstrError(),
    );
  }

  cancel() {
    this.ref.close();
  }

}
