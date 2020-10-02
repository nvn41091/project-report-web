import {Component, OnInit, Injectable} from '@angular/core';
import {Role} from 'assets/service/role.service';
import {NbDialogRef} from '@nebular/theme';
import {
  TreeviewConfig,
  TreeviewI18n,
  TreeviewEventParser,
  TreeviewItem,
  OrderDownlineTreeviewEventParser,
  DownlineTreeviewItem,
} from 'ngx-treeview';
import {DefaultTreeviewI18n} from 'app/@theme/directives/DefaultTreeviewI8n';
import {RoleModuleService} from '../../../../assets/service/role-module.service';
import {formatTree} from '../../../@theme/directives/common';

@Injectable()
export class RoleModuleTreeviewConfig extends TreeviewConfig {
  hasAllCheckBox = true;
  hasFilter = true;
  hasCollapseExpand = false;
  maxHeight: null;
}

@Component({
  selector: 'ngx-role-module',
  templateUrl: './role-module.component.html',
  styleUrls: ['./role-module.component.scss'],
  providers: [
    {provide: TreeviewConfig, useClass: RoleModuleTreeviewConfig},
    {provide: TreeviewI18n, useClass: DefaultTreeviewI18n},
    {provide: TreeviewEventParser, useClass: OrderDownlineTreeviewEventParser},
  ],
})
export class RoleModuleComponent implements OnInit {
  role: Role;
  loading: boolean = false;
  items: TreeviewItem[] = [];
  config = {
    maxHeight: null,
  };

  constructor(private ref: NbDialogRef<RoleModuleComponent>,
              private roleModuleService: RoleModuleService) {
  }

  ngOnInit(): void {
    this.roleModuleService.getAll(this.role.id).subscribe(
      res => this.items = formatTree(res.body, null, 'name'));
  }

  onSelectedChange(selected: DownlineTreeviewItem[]) {
  }

  save() {
    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }
}
