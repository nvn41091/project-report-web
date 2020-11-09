import {Component, OnInit, ViewChild} from '@angular/core';
import {
  ComplexHierarchicalTree,
  ConnectorModel,
  DataBinding,
  Diagram,
  DiagramTools,
  HierarchicalTree,
  NodeModel,
  SnapConstraints,
  SnapSettingsModel
} from '@syncfusion/ej2-diagrams';
import {DiagramComponent} from '@syncfusion/ej2-angular-diagrams';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DataManager} from '@syncfusion/ej2-data';

@Component({
  selector: 'ngx-project-stage',
  templateUrl: './project-stage.component.html',
  styleUrls: ['./project-stage.component.scss']
})
export class ProjectStageComponent implements OnInit {
  loading: boolean = false;
  @ViewChild('diagram')
  public diagram: DiagramComponent;
  public layout: Object = {
    type: 'ComplexHierarchicalTree',
    orientation: 'LeftToRight',
    verticalSpacing: 100,
    horizontalSpacing: 70,
    margin: {left: 30, right: 10, top: 30, bottom: 50},
    getLayoutInfo: (node) => {
      if (true) {
        node.style.fill = '#8d137e';
      }
    }
  };
  public tool: DiagramTools = DiagramTools.ZoomPan;
  public snapSettings: SnapSettingsModel = {constraints: SnapConstraints.None};

  color = {
    red: '#C62539',
    gray: '#82858A',
    green: '#4EA548',
  };
  dataReport: any = [{
    icon: 'folder',
    text: 'Test'
  }];
  public fields = {
    iconCss: 'icon', tooltip: 'name'
  };

  search() {
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  onSelectReport(data) {
  }

  loadData() {
  }
}
