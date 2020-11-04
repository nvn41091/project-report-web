import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInformationUpdateComponent } from './project-information-update.component';

describe('ProjectInformationUpdateComponent', () => {
  let component: ProjectInformationUpdateComponent;
  let fixture: ComponentFixture<ProjectInformationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInformationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInformationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
