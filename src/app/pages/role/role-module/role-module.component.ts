import {Component, OnInit, Injectable} from '@angular/core';
import {Role} from 'assets/service/role.service';
import {NbDialogRef} from '@nebular/theme';
import {
  TreeviewConfig,
  TreeviewI18n,
  TreeviewEventParser,
  TreeviewItem,
  DownlineTreeviewItem,
  DefaultTreeviewEventParser,
} from 'ngx-treeview';
import {DefaultTreeviewI18n} from 'app/@theme/directives/DefaultTreeviewI8n';
import {RoleModuleService} from '../../../../assets/service/role-module.service';
import {formatTree} from '../../../@theme/directives/common';
import {CustomToastrService} from '../../../shared/services/custom-toastr.service';

@Component({
  selector: 'ngx-role-module',
  templateUrl: './role-module.component.html',
  styleUrls: ['./role-module.component.scss'],
  providers: [
    TreeviewConfig,
    {provide: TreeviewI18n, useClass: DefaultTreeviewI18n},
    {provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser},
  ],
})
export class RoleModuleComponent implements OnInit {
  role: Role;
  loading: boolean = false;
  items: TreeviewItem[] = [];
  config: TreeviewConfig = TreeviewConfig.create({
    hasAllCheckBox: false,
    hasFilter: true,
    hasCollapseExpand: false,
    maxHeight: undefined,
  });
  selected: any[] = [];

  constructor(private ref: NbDialogRef<RoleModuleComponent>,
              private roleModuleService: RoleModuleService,
              private toastr: CustomToastrService) {
  }

  ngOnInit(): void {
    this.roleModuleService.getAll(this.role.id).subscribe(
      res => this.items = formatTree(res.body, null, 'name'));
  }

  save() {
    const data = this.selected.map(x => new Object({
      roleId: this.role.id,
      moduleId: x.parentId,
      actionId: Number(x.id.replace('#', '')),
      updateTime: new Date(),
    }));
    this.roleModuleService.save(data, this.role.id).subscribe(
      res => this.toastr.success('common.label.update_success', true),
      error => this.toastr.unknownError(),
      () => this.ref.close('confirm'),
    );
  }

  cancel() {
    this.ref.close();
  }
}
