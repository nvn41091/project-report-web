import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectInformationMoreComponent } from './project-information-more.component';

describe('ProjectInformationMoreComponent', () => {
  let component: ProjectInformationMoreComponent;
  let fixture: ComponentFixture<ProjectInformationMoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectInformationMoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectInformationMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
