import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';

@Component({
  selector: 'ngx-kpi-map',
  templateUrl: './kpi-map.component.html',
  styleUrls: ['./kpi-map.component.scss']
})
export class KpiMapComponent implements OnInit {
  items: any;
  @Input() row: string
  @Input() column: string
  constructor(public ref: NbDialogRef<KpiMapComponent>) { }

  ngOnInit(): void {
  }

}
