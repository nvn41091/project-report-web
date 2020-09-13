import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpiMapComponent } from './kpi-map.component';

describe('KpiMapComponent', () => {
  let component: KpiMapComponent;
  let fixture: ComponentFixture<KpiMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpiMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpiMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
