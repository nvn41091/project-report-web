import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStageComponent } from './project-stage.component';

describe('ProjectStageComponent', () => {
  let component: ProjectStageComponent;
  let fixture: ComponentFixture<ProjectStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectStageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
