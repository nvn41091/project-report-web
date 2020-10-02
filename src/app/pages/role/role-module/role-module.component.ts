import {Component, OnInit} from '@angular/core';
import {Role} from 'assets/service/role.service';
import {NbDialogRef} from '@nebular/theme';
import {
  TreeviewConfig,
  TreeviewI18n,
  TreeviewEventParser,
  DefaultTreeviewEventParser,
} from 'ngx-treeview';
import { DefaultTreeviewI18n } from 'app/@theme/directives/DefaultTreeviewI8n';

@Component({
  selector: 'ngx-role-module',
  templateUrl: './role-module.component.html',
  styleUrls: ['./role-module.component.scss'],
  providers: [
    TreeviewConfig,
    { provide: TreeviewI18n, useClass: DefaultTreeviewI18n },
    { provide: TreeviewEventParser, useClass: DefaultTreeviewEventParser },
  ],
})
export class RoleModuleComponent implements OnInit {
  role: Role;
  loading: boolean = false;

  constructor(private ref: NbDialogRef<RoleModuleComponent>) {
  }

  ngOnInit(): void {
  }

  save() {
    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }
}
